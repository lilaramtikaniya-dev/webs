export interface DocContent {
  id: string;
  title: string;
  description: string;
  body: string[];
  code?: { language: string; filename?: string; code: string };
}

export const DOCS: DocContent[] = [
  {
    id: "lexer",
    title: "Lexer",
    description: "Turning source code into tokens.",
    body: [
      "The lexer (or tokenizer) is the first stage of the runtime. It reads raw JavaScript source code character by character and groups those characters into meaningful units called tokens.",
      "Each token has a type — such as Identifier, Number, String, Keyword, or Operator — and a value. Whitespace and comments are typically discarded at this stage, unless they're needed for error reporting.",
      "JSForge's lexer is implemented as a single-pass scanner in C++. It maintains a cursor position, a line/column counter for error messages, and a lookahead buffer for multi-character tokens like '===' or '=>'.",
    ],
    code: {
      language: "cpp",
      filename: "lexer.cpp",
      code: `Token Lexer::nextToken() {
  skipWhitespaceAndComments();

  if (isAtEnd()) return makeToken(TokenType::EOF_TOKEN);

  char c = advance();

  if (isDigit(c)) return number();
  if (isAlpha(c)) return identifierOrKeyword();

  switch (c) {
    case '+': return makeToken(TokenType::PLUS);
    case '-': return makeToken(TokenType::MINUS);
    case '=':
      if (match('=')) {
        if (match('=')) return makeToken(TokenType::STRICT_EQUAL);
        return makeToken(TokenType::EQUAL_EQUAL);
      }
      if (match('>')) return makeToken(TokenType::ARROW);
      return makeToken(TokenType::ASSIGN);
    // ... more cases
  }

  throw LexError("Unexpected character", line, column);
}`,
    },
  },
  {
    id: "parser",
    title: "Parser",
    description: "Turning tokens into a syntax tree.",
    body: [
      "The parser consumes the token stream produced by the lexer and builds a structured representation of the program according to JavaScript's grammar rules.",
      "JSForge uses a recursive-descent parser with operator precedence climbing for expressions. Each grammar rule — statements, declarations, expressions — corresponds to a parsing function.",
      "When the parser encounters a syntax error (for example, a missing closing brace), it reports the line and column and attempts to recover so it can continue reporting additional errors.",
    ],
    code: {
      language: "cpp",
      filename: "parser.cpp",
      code: `std::unique_ptr<Expr> Parser::parseExpression() {
  return parseAssignment();
}

std::unique_ptr<Expr> Parser::parseAssignment() {
  auto expr = parseLogicalOr();

  if (match(TokenType::ASSIGN)) {
    Token equals = previous();
    auto value = parseAssignment();
    return std::make_unique<AssignExpr>(std::move(expr), std::move(value));
  }

  return expr;
}

std::unique_ptr<Expr> Parser::parseLogicalOr() {
  auto expr = parseLogicalAnd();
  while (match(TokenType::OR)) {
    Token op = previous();
    auto right = parseLogicalAnd();
    expr = std::make_unique<LogicalExpr>(std::move(expr), op, std::move(right));
  }
  return expr;
}`,
    },
  },
  {
    id: "ast",
    title: "AST",
    description: "The abstract syntax tree representation.",
    body: [
      "The Abstract Syntax Tree (AST) is the output of the parser. It represents the program's structure as a hierarchy of nodes — each node corresponds to a construct in the source code, such as a binary expression, a function declaration, or an if statement.",
      "JSForge defines a base 'Node' class with derived classes for each construct: 'BinaryExpr', 'CallExpr', 'VarDeclaration', 'IfStatement', 'ForStatement', 'FunctionDeclaration', and more.",
      "The AST is intentionally decoupled from source formatting — whitespace, comments, and parentheses used purely for grouping don't appear in the tree, only the structure they imply.",
    ],
    code: {
      language: "cpp",
      filename: "ast.h",
      code: `struct BinaryExpr : Expr {
  std::unique_ptr<Expr> left;
  Token op;
  std::unique_ptr<Expr> right;

  BinaryExpr(std::unique_ptr<Expr> left, Token op, std::unique_ptr<Expr> right)
    : left(std::move(left)), op(op), right(std::move(right)) {}

  Value accept(Interpreter& interpreter) override {
    return interpreter.visitBinaryExpr(*this);
  }
};

struct IfStatement : Stmt {
  std::unique_ptr<Expr> condition;
  std::unique_ptr<Stmt> thenBranch;
  std::unique_ptr<Stmt> elseBranch; // nullable

  void accept(Interpreter& interpreter) override {
    interpreter.visitIfStatement(*this);
  }
};`,
    },
  },
  {
    id: "interpreter",
    title: "Interpreter",
    description: "Walking the AST and evaluating it.",
    body: [
      "The interpreter walks the AST using the visitor pattern. For each node type, there's a corresponding 'visit' method that knows how to evaluate that construct.",
      "Expressions evaluate to a 'Value' — a tagged union representing JavaScript's runtime types: number, string, boolean, null, undefined, object, array, or function.",
      "Statements don't produce values directly but may have side effects: declaring variables, mutating the environment, or producing output via console.log.",
      "Control flow constructs (if/else, loops, switch) are implemented by conditionally visiting different branches of the tree, and loops use signals (break/continue/return) propagated as special control-flow exceptions internally.",
    ],
    code: {
      language: "cpp",
      filename: "interpreter.cpp",
      code: `Value Interpreter::visitBinaryExpr(BinaryExpr& expr) {
  Value left = evaluate(*expr.left);
  Value right = evaluate(*expr.right);

  switch (expr.op.type) {
    case TokenType::PLUS:
      if (left.isString() || right.isString()) {
        return Value::makeString(left.toString() + right.toString());
      }
      return Value::makeNumber(left.toNumber() + right.toNumber());

    case TokenType::MINUS:
      return Value::makeNumber(left.toNumber() - right.toNumber());

    case TokenType::STRICT_EQUAL:
      return Value::makeBoolean(left.strictEquals(right));

    // ... more operators
  }

  throw RuntimeError("Unknown binary operator");
}`,
    },
  },
  {
    id: "runtime",
    title: "Runtime",
    description: "Built-in objects, functions, and the call stack.",
    body: [
      "The runtime provides the standard library that JavaScript programs rely on: array methods (map, filter, reduce, find, every, some), string methods, the Math object, and the Date object.",
      "Functions are first-class values. Both regular functions and arrow functions are represented as 'FunctionValue' objects that capture their defining environment — enabling closures.",
      "Calling a function pushes a new frame onto the call stack, with its own local scope chained to the enclosing (lexical) scope. Returning from a function pops that frame and propagates the return value.",
      "Native (built-in) functions like 'Array.prototype.map' are implemented directly in C++ and registered into the global environment at startup, so they can be called like any user-defined function.",
    ],
    code: {
      language: "cpp",
      filename: "runtime/array_methods.cpp",
      code: `Value arrayMap(Interpreter& interp, std::vector<Value>& array,
                FunctionValue& callback) {
  std::vector<Value> result;
  result.reserve(array.size());

  for (size_t i = 0; i < array.size(); ++i) {
    std::vector<Value> args = { array[i], Value::makeNumber(i) };
    Value mapped = interp.callFunction(callback, args);
    result.push_back(mapped);
  }

  return Value::makeArray(std::move(result));
}`,
    },
  },
  {
    id: "memory-model",
    title: "Memory Model",
    description: "Scopes, environments, and garbage collection.",
    body: [
      "JSForge models JavaScript's lexical scoping using a chain of 'Environment' objects. Each environment holds a map of variable names to values and a pointer to its enclosing (parent) environment.",
      "Variable lookups walk up the environment chain until the name is found, mirroring how 'let' and 'const' declarations are resolved in real JavaScript engines.",
      "Memory for objects and arrays is managed using reference-counted smart pointers ('std::shared_ptr') in the current implementation. A future goal is to introduce a simple mark-and-sweep garbage collector to handle reference cycles.",
      "Block-scoped declarations ('let'/'const') create a new environment for each block ('{ ... }'), while function calls create a new environment for the function body, chained to the environment where the function was defined — this is what makes closures work correctly.",
    ],
    code: {
      language: "cpp",
      filename: "environment.h",
      code: `class Environment {
public:
  explicit Environment(std::shared_ptr<Environment> parent = nullptr)
    : parent_(std::move(parent)) {}

  void define(const std::string& name, Value value) {
    values_[name] = std::move(value);
  }

  Value get(const std::string& name) {
    if (values_.count(name)) return values_[name];
    if (parent_) return parent_->get(name);
    throw RuntimeError("Undefined variable '" + name + "'");
  }

  void assign(const std::string& name, Value value) {
    if (values_.count(name)) { values_[name] = std::move(value); return; }
    if (parent_) { parent_->assign(name, std::move(value)); return; }
    throw RuntimeError("Undefined variable '" + name + "'");
  }

private:
  std::unordered_map<std::string, Value> values_;
  std::shared_ptr<Environment> parent_;
};`,
    },
  },
];
