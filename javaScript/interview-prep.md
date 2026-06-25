# 🚀 Backend Interview Preparation Guide
### Suraj Bhoji | Full Stack Developer (Angular + Node.js)
**Target Role:** Full Stack Developer @ Movate (Angular + Node.js) | 3+ Years Experience

---

## 📋 Table of Contents
1. [Resume Analysis](#1-resume-analysis)
2. [JavaScript Questions](#2-javascript-questions)
3. [TypeScript Questions](#3-typescript-questions)
4. [Node.js Questions](#4-nodejs-questions)
5. [NestJS Questions](#5-nestjs-questions)
6. [PostgreSQL Questions](#6-postgresql-questions)
7. [REST API Questions](#7-rest-api-questions)
8. [Authentication & Authorization](#8-authentication--authorization)
9. [WebSockets](#9-websockets)
10. [Bull Queue & Cron Jobs](#10-bull-queue--cron-jobs)
11. [AWS & Deployment](#11-aws--deployment)
12. [System Design](#12-system-design)
13. [Angular Questions](#13-angular-questions)
14. [Project-Based Questions](#14-project-based-questions)
15. [Behavioral Questions](#15-behavioral-questions)
16. [Manager Round Questions](#16-manager-round-questions)
17. [JD-Specific Questions (Movate)](#17-jd-specific-questions-movate)
18. [Rapid-Fire Questions](#18-rapid-fire-questions)
19. [50 Most Important Questions](#19-50-most-important-questions)
20. [20 Frequently Asked Follow-Up Questions](#20-20-frequently-asked-follow-up-questions)
21. [One Day Before Interview Revision Sheet](#21-one-day-before-interview-revision-sheet)

---

## 1. Resume Analysis

### ✅ Technologies Identified
| Category | Technologies |
|---|---|
| Frontend | Angular (v11→v15), React.js, Next.js, RxJS, HTML5, CSS3 |
| Backend | Node.js, NestJS, REST APIs, WebSockets, JWT Auth, Bull Queues, Cron Jobs |
| Databases | PostgreSQL, MongoDB, SQL Queries, Aggregations, Indexing |
| Cloud & DevOps | AWS (EC2, S3), Vercel, Git, GitHub, Postman, Swagger, Linux |
| Patterns | Microservices, Modular Architecture |

### 🔍 Key Achievements (Anchor these in every answer)
- Angular v11 → v15 migration with **lazy loading, AOT, change detection** optimizations
- **40% AWS hosting cost reduction** via HBS server-side rendering
- **Bull Queue** background processing for large report generation
- PostgreSQL optimization with **ARRAY_AGG, JSON_AGG, strategic indexing**
- AWS S3 image pipeline for travel assets
- Queue-based email workflows for booking confirmations
- Cron-based scheduled jobs for data sync and cleanup
- Third-party supplier webhook integration

---

## 2. JavaScript Questions

### Q1. What is the JavaScript Event Loop? How does it work?

**Answer (Interview Ready):**
JavaScript is single-threaded. The event loop allows asynchronous operations by managing the Call Stack, Web APIs, Callback Queue (macrotasks), and Microtask Queue. When the call stack is empty, the event loop first drains all microtasks (Promises, queueMicrotask), then picks one macrotask (setTimeout, setInterval, I/O) from the queue.

**Order:** Call Stack → Microtask Queue → Macrotask Queue

```javascript
console.log('1');
setTimeout(() => console.log('2'), 0);
Promise.resolve().then(() => console.log('3'));
console.log('4');
// Output: 1, 4, 3, 2
```

**Follow-up Questions:**
- What's the difference between microtasks and macrotasks?
- What happens when you have a long-running synchronous operation?

**Common Mistakes:** Assuming `setTimeout(fn, 0)` runs immediately — it's queued as a macrotask after all microtasks.

---

### Q2. What are Closures? Give a real-world example.

**Answer:**
A closure is a function that retains access to its outer scope's variables even after the outer function has finished executing.

```javascript
function createCounter() {
  let count = 0;
  return {
    increment: () => ++count,
    decrement: () => --count,
    value: () => count
  };
}
const counter = createCounter();
counter.increment(); // 1
counter.increment(); // 2
```

**Real-world use in your project:** RxJS subscriptions and Angular service singletons rely on closures to maintain state.

**Follow-up:** How can closures cause memory leaks? (Holding references to large objects/DOM elements that can't be GC'd.)

---

### Q3. Explain Promises vs Async/Await.

**Answer:**
Both handle asynchronous code. Promises use `.then()/.catch()` chaining. Async/Await is syntactic sugar over Promises, making code read synchronously.

```javascript
// Promise
fetchData().then(data => process(data)).catch(err => handle(err));

// Async/Await
async function run() {
  try {
    const data = await fetchData();
    process(data);
  } catch(err) {
    handle(err);
  }
}
```

**Follow-up:** What does `Promise.all` vs `Promise.allSettled` do?
- `Promise.all` — fails fast if any promise rejects
- `Promise.allSettled` — waits for all, returns each result (fulfilled or rejected)

---

### Q4. What is Hoisting?

**Answer:**
JavaScript moves variable and function declarations to the top of their scope during compilation. `var` is hoisted and initialized as `undefined`. `let`/`const` are hoisted but remain in the **Temporal Dead Zone** until their declaration line.

```javascript
console.log(x); // undefined (var hoisted)
var x = 5;

console.log(y); // ReferenceError (TDZ)
let y = 10;
```

---

### Q5. Explain `this` keyword in different contexts.

**Answer:**
- **Global scope:** `this` = `window` (browser) / `global` (Node.js)
- **Object method:** `this` = the object
- **Arrow functions:** `this` is lexically bound (inherits from enclosing scope)
- **Constructor:** `this` = new instance
- **Event handlers:** `this` = the DOM element (unless arrow function)

```javascript
const obj = {
  name: 'Suraj',
  greet: function() { console.log(this.name); }, // 'Suraj'
  greetArrow: () => { console.log(this.name); }  // undefined (lexical this)
};
```

---

### Q6. What is Debouncing vs Throttling?

**Answer:**
- **Debouncing:** Delays execution until after a pause in calls. Ideal for search input (fire API only after user stops typing).
- **Throttling:** Limits execution to at most once per time window. Ideal for scroll events.

```javascript
// Debounce
function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

// Throttle
function throttle(fn, limit) {
  let lastCall = 0;
  return (...args) => {
    if (Date.now() - lastCall >= limit) {
      lastCall = Date.now();
      fn(...args);
    }
  };
}
```

**In your Angular project:** RxJS `debounceTime()` and `throttleTime()` operators were likely used for search/filter inputs.

---

### Q7. What are Memory Leaks in JavaScript? How do you prevent them?

**Answer:**
Memory leaks occur when memory is allocated but never freed. Common causes:
1. Forgotten event listeners (not removed on component destroy)
2. Global variables holding large references
3. Closures holding DOM references
4. Uncleared `setInterval`

**In Angular context:** Not unsubscribing from RxJS observables causes leaks. Use `takeUntil`, `async pipe`, or `unsubscribe()` in `ngOnDestroy`.

---

### Q8. Explain Prototype Chain.

**Answer:**
Every JavaScript object has a `[[Prototype]]` property pointing to another object. Property lookups traverse this chain until `null`. This is the basis of inheritance in JS.

```javascript
function Animal(name) { this.name = name; }
Animal.prototype.speak = function() { return `${this.name} speaks`; };
const dog = new Animal('Rex');
dog.speak(); // Rex speaks — found on Animal.prototype
```

---

### Q9. What are ES6+ Features you commonly use?

**Answer:**
- Arrow functions, Destructuring, Spread/Rest operators
- Template literals, Optional chaining (`?.`), Nullish coalescing (`??`)
- Modules (`import/export`), Classes, `let`/`const`
- `Promise`, `async/await`, `Map`, `Set`
- `Array.from()`, `.find()`, `.flatMap()`, `.includes()`

---

### Q10. What is the difference between `==` and `===`?

**Answer:**
`==` performs type coercion before comparison. `===` checks both value and type — always prefer `===`.

```javascript
0 == false  // true (coercion)
0 === false // false (different types)
```

---

## 3. TypeScript Questions

### Q11. Types vs Interfaces — when do you use which?

**Answer:**
- **Interface:** Best for defining object shapes and contracts. Supports declaration merging.
- **Type:** More flexible — supports unions, intersections, mapped types, primitives.

```typescript
// Interface — preferred for object shapes
interface User { id: number; name: string; }

// Type — for unions and complex types
type Status = 'active' | 'inactive' | 'pending';
type ApiResponse<T> = { data: T; error: string | null; };
```

**Rule of thumb:** Use `interface` for public APIs; `type` for everything else.

---

### Q12. What are Generics? Give a real-world example.

**Answer:**
Generics allow writing reusable, type-safe code that works with multiple types.

```typescript
// Generic API response wrapper
function parseResponse<T>(response: unknown): T {
  return response as T;
}

// Generic repository pattern in NestJS
interface Repository<T> {
  findById(id: number): Promise<T>;
  create(data: Partial<T>): Promise<T>;
  update(id: number, data: Partial<T>): Promise<T>;
}
```

---

### Q13. What are Utility Types? Name and explain at least 5.

**Answer:**

| Utility Type | Description | Example |
|---            |---                            |---                                |
| `Partial<T>`  | Makes all properties optional | `Partial<User>` for update DTOs |
| `Required<T>` | Makes all properties required | `Required<Config>` |
| `Pick<T, K>`  | Selects specific keys         | `Pick<User, 'id' \| 'name'>` |
| `Omit<T, K>`  | Excludes specific keys        | `Omit<User, 'password'>` |
| `Readonly<T>` | Makes properties immutable    | Config objects |
| `Record<K, V>`| Maps keys to value types      | `Record<string, number>` |

---

### Q14. What are Decorators? How are they used in NestJS?

**Answer:**
Decorators are functions that modify class/method/property behavior at design time. In NestJS they are fundamental:

```typescript
@Injectable()           // Marks class as a provider
@Controller('users')    // Defines route prefix
@Get(':id')             // HTTP method + route
@Body()                 // Extracts request body
@Param('id')            // Extracts route param
@UseGuards(AuthGuard)   // Applies guard
```

Decorators use TypeScript's metadata reflection API under the hood.

---

### Q15. What are Type Guards?

**Answer:**
Type guards narrow types within conditional blocks.

```typescript
// typeof guard
function printValue(val: string | number) {
  if (typeof val === 'string') {
    console.log(val.toUpperCase()); // string here
  }
}

// instanceof guard
if (error instanceof HttpException) { ... }

// Custom type guard
function isUser(obj: any): obj is User {
  return obj && typeof obj.id === 'number';
}
```

---

### Q16. Abstract Classes vs Interfaces

**Answer:**
- **Interface:** Only type contract, no implementation. Cannot be instantiated.
- **Abstract Class:** Can have partial implementation + abstract methods. Subclasses must implement abstract methods.

```typescript
abstract class BaseRepository<T> {
  abstract findById(id: number): Promise<T>;
  
  async exists(id: number): Promise<boolean> {
    const result = await this.findById(id);
    return !!result;
  }
}
```

---

### Q17. What is Dependency Injection in TypeScript/NestJS?

**Answer:**
DI is a pattern where dependencies are provided to a class rather than created inside it. NestJS's IoC container manages this automatically.

```typescript
@Injectable()
class UserService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private mailerService: MailerService
  ) {}
}
```

Benefits: Testability (inject mocks), loose coupling, single responsibility.

---

## 4. Node.js Questions

### Q18. Explain Node.js Event Loop in detail.

**Answer:**
Node.js event loop has 6 phases:
1. **Timers** — `setTimeout`, `setInterval` callbacks
2. **Pending I/O** — deferred I/O callbacks
3. **Idle/Prepare** — internal use
4. **Poll** — retrieve I/O events, execute callbacks
5. **Check** — `setImmediate` callbacks
6. **Close** — close event callbacks

`process.nextTick()` runs before each phase transition (higher priority than `Promise.then()`).

---

### Q19. What are Streams in Node.js?

**Answer:**
Streams process data in chunks instead of loading everything into memory — critical for large files.

Types:
- **Readable** — Read source (`fs.createReadStream`)
- **Writable** — Write destination (`fs.createWriteStream`)
- **Duplex** — Both read and write (TCP socket)
- **Transform** — Modify data (gzip compression)

```javascript
// Pipe a large file — memory efficient
fs.createReadStream('large-file.csv')
  .pipe(csvParser())
  .pipe(processStream())
  .pipe(fs.createWriteStream('output.json'));
```

**Real-world relevance:** S3 file uploads/downloads in your project benefit from streams.

---

### Q20. What is Clustering in Node.js?

**Answer:**
The `cluster` module spawns multiple worker processes sharing the same port, utilizing all CPU cores (Node.js is single-threaded by default).

```javascript
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

if (cluster.isPrimary) {
  for (let i = 0; i < numCPUs; i++) cluster.fork();
} else {
  app.listen(3000); // Each worker listens independently
}
```

**Alternative:** Use PM2's cluster mode for production.

---

### Q21. How does Node.js handle concurrency without threads?

**Answer:**
Node.js uses a non-blocking I/O model. CPU-intensive tasks are offloaded to the **libuv thread pool** (default 4 threads) for file system, DNS, crypto operations. I/O callbacks return results to the event loop asynchronously, keeping the main thread free.

For CPU-heavy tasks: Use **Worker Threads** to avoid blocking the event loop.

---

### Q22. What are Worker Threads?

**Answer:**
Worker threads allow running JavaScript in parallel threads for CPU-intensive work (image processing, large data transformations).

```javascript
const { Worker } = require('worker_threads');

const worker = new Worker('./heavy-task.js', { workerData: { input: data } });
worker.on('message', result => console.log(result));
```

Unlike `cluster`, workers share memory via `SharedArrayBuffer`.

---

### Q23. How do you handle errors in Node.js/Express?

**Answer:**
Centralized error handling middleware in Express:

```javascript
// Async wrapper to catch errors
const asyncHandler = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

// Global error handler (must have 4 params)
app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({ message: err.message, ...(dev && { stack: err.stack }) });
});
```

In NestJS: Exception filters handle this centrally.

---

### Q24. What are Node.js Security Best Practices?

**Answer:**
1. Use `helmet` for HTTP security headers
2. Rate limiting (`express-rate-limit`)
3. Validate/sanitize all inputs (class-validator)
4. Never log sensitive data (passwords, tokens)
5. Use environment variables for secrets (never hardcode)
6. Parameterized queries (prevent SQL injection)
7. JWT with short expiry + refresh tokens
8. CORS configuration (whitelist specific origins)
9. HTTPS only in production
10. Regular dependency audits (`npm audit`)

**From your resume:** You separated secure keys using `.env` — mention this.

---

## 5. NestJS Questions

### Q25. What is NestJS Architecture?

**Answer:**
NestJS is a progressive Node.js framework built on Express (or Fastify). Its architecture is inspired by Angular:

- **Modules:** Organize the application into cohesive blocks
- **Controllers:** Handle incoming requests, return responses
- **Services/Providers:** Business logic, injected via DI
- **Guards:** Authorization (auth checks)
- **Interceptors:** Transform requests/responses, logging
- **Pipes:** Validation and transformation
- **Filters:** Exception handling

```
AppModule
├── AuthModule (AuthController, AuthService, JwtGuard)
├── UserModule (UserController, UserService, UserRepository)
└── ReportModule (ReportController, ReportService, BullQueue)
```

---

### Q26. What are DTOs and why are they important?

**Answer:**
DTOs (Data Transfer Objects) define the shape of data flowing into an API endpoint. Combined with class-validator, they provide automatic validation.

```typescript
import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;
}

// Controller
@Post()
async create(@Body() dto: CreateUserDto) { ... }
```

**Why important:** Prevents invalid data from reaching business logic; self-documenting API.

---

### Q27. Guards vs Middleware vs Interceptors — What's the difference?

**Answer:**

| Feature | Middleware | Guard | Interceptor |
|---|---|---|---|
| Purpose | Request preprocessing | Authorization decision | Transform req/res, logging |
| Return | Calls `next()` | Returns `true/false` | Can modify response |
| Access to execution context | No | Yes | Yes |
| Use case | Logging, parsing | JWT auth, roles | Response transform, caching |

```typescript
// Guard example
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext): boolean {
    return super.canActivate(context);
  }
}
```

---

### Q28. How does NestJS Dependency Injection work?

**Answer:**
NestJS uses a module-scoped IoC container. Providers decorated with `@Injectable()` are registered in a module. NestJS resolves dependencies automatically through constructor injection.

```typescript
@Module({
  providers: [UserService, UserRepository],
  exports: [UserService], // Export to make available to other modules
})
export class UserModule {}
```

**Scopes:** DEFAULT (singleton), REQUEST (per request), TRANSIENT (new instance per injection).

---

### Q29. How did you implement Bull Queue for report generation?

**Answer (Project-specific):**
In my current project, we have a report module that generates large datasets. Doing this synchronously would timeout and block the server, so I implemented it with Bull Queue:

1. User requests report → API creates a job in Redis-backed Bull Queue and returns `jobId` immediately
2. Worker process picks up the job, runs DB aggregation queries with `ARRAY_AGG`/`JSON_AGG`
3. Progress events emitted via WebSocket to the client
4. On completion, report stored in S3 and client notified
5. Client downloads via pre-signed S3 URL

```typescript
@InjectQueue('report') private reportQueue: Queue

async generateReport(dto: ReportDto) {
  const job = await this.reportQueue.add('generate', dto, {
    attempts: 3,
    backoff: { type: 'exponential', delay: 2000 }
  });
  return { jobId: job.id };
}
```

---

### Q30. How do Cron Jobs work in NestJS?

**Answer:**
Using `@nestjs/schedule` package with `@Cron()` decorator:

```typescript
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class SchedulerService {
  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async cleanupExpiredSessions() {
    await this.sessionRepo.deleteExpired();
  }

  @Cron('0 9 * * MON-FRI') // 9AM weekdays
  async sendDailyReport() {
    await this.reportService.sendSummary();
  }
}
```

**From your resume:** Used for automated data synchronization, cleanup, and reporting.

---

### Q31. What are Interceptors? Give a real-world use case.

**Answer:**
Interceptors wrap the request/response lifecycle using RxJS `Observable`.

```typescript
@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(data => ({ success: true, data, timestamp: new Date() }))
    );
  }
}

// Logging Interceptor
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const start = Date.now();
    return next.handle().pipe(
      tap(() => console.log(`Request took ${Date.now() - start}ms`))
    );
  }
}
```

---

### Q32. Explain Exception Filters in NestJS.

**Answer:**
Exception filters catch unhandled exceptions and return structured error responses.

```typescript
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    
    response.status(status).json({
      statusCode: status,
      message: exception.message,
      timestamp: new Date().toISOString(),
    });
  }
}
```

---

### Q33. What are NestJS Pipes?

**Answer:**
Pipes transform or validate incoming data. Built-in pipes: `ValidationPipe`, `ParseIntPipe`, `ParseUUIDPipe`.

```typescript
// Global validation pipe
app.useGlobalPipes(new ValidationPipe({
  whitelist: true,         // Strip unknown properties
  forbidNonWhitelisted: true,
  transform: true,         // Auto-transform types
}));

// Custom pipe
@Injectable()
export class ParsePositiveIntPipe implements PipeTransform {
  transform(value: string) {
    const val = parseInt(value);
    if (val <= 0) throw new BadRequestException('Must be positive');
    return val;
  }
}
```

---

## 6. PostgreSQL Questions

### Q34. What types of indexes did you use and why?

**Answer (Project-specific):**
In the travel booking system, I used:

- **B-tree indexes** (default) on frequently filtered columns like `user_id`, `booking_date`, `destination_id`
- **Composite indexes** on columns used together in WHERE clauses: `(user_id, status)` for dashboard queries
- **Partial indexes** on active records: `WHERE status = 'active'` to keep index small
- **GIN indexes** on JSONB columns for supplier webhook data

```sql
CREATE INDEX idx_bookings_user_status ON bookings(user_id, status);
CREATE INDEX idx_active_bookings ON bookings(created_at) WHERE status = 'active';
CREATE INDEX idx_supplier_data ON bookings USING GIN(supplier_data);
```

---

### Q35. Explain ARRAY_AGG and JSON_AGG. When did you use them?

**Answer (Project-specific):**
These are PostgreSQL aggregate functions that collect multiple rows into arrays/JSON.

```sql
-- ARRAY_AGG: collect destination names into an array per booking
SELECT b.id, b.user_id, ARRAY_AGG(d.name) as destinations
FROM bookings b
JOIN booking_destinations bd ON b.id = bd.booking_id
JOIN destinations d ON bd.destination_id = d.id
GROUP BY b.id, b.user_id;

-- JSON_AGG: collect nested objects
SELECT u.id, JSON_AGG(
  JSON_BUILD_OBJECT('id', b.id, 'date', b.booking_date, 'status', b.status)
) as bookings
FROM users u JOIN bookings b ON u.id = b.user_id
GROUP BY u.id;
```

**Why I used it:** Instead of N+1 queries (fetch bookings, then loop to fetch destinations), a single query with `JSON_AGG` returns the complete nested structure, drastically reducing database round trips.

---

### Q36. How do you optimize a slow PostgreSQL query?

**Answer:**
Step-by-step approach:

1. **Run EXPLAIN ANALYZE** to get the query plan
2. Look for: **Sequential Scans** on large tables, high **rows** estimates, expensive **Sort/Hash Join**
3. Add appropriate indexes
4. Rewrite subqueries as CTEs or JOINs
5. Use `LIMIT`/pagination
6. Check for N+1 issues — use JOINs or batch queries

```sql
EXPLAIN (ANALYZE, BUFFERS, FORMAT TEXT)
SELECT * FROM bookings WHERE user_id = 123 AND status = 'confirmed';
```

**Key metrics:** `actual time`, `rows`, `Seq Scan vs Index Scan`.

---

### Q37. What is the difference between INNER JOIN, LEFT JOIN, and FULL OUTER JOIN?

**Answer:**
- **INNER JOIN:** Returns rows with matching values in both tables
- **LEFT JOIN:** Returns all rows from left table + matching rows from right (NULLs for no match)
- **RIGHT JOIN:** Opposite of LEFT
- **FULL OUTER JOIN:** All rows from both tables, NULLs where no match

```sql
-- LEFT JOIN example: all users, even those without bookings
SELECT u.name, b.booking_date
FROM users u
LEFT JOIN bookings b ON u.id = b.user_id;
```

---

### Q38. Explain ACID properties.

**Answer:**
- **Atomicity:** Transaction is all-or-nothing. If payment deducts but booking fails, both are rolled back.
- **Consistency:** Database moves from one valid state to another. Constraints are never violated.
- **Isolation:** Concurrent transactions don't interfere. Defined by isolation levels.
- **Durability:** Committed transactions survive crashes (written to WAL/disk).

```sql
BEGIN;
UPDATE accounts SET balance = balance - 500 WHERE id = 1;
INSERT INTO bookings (user_id, amount) VALUES (1, 500);
COMMIT; -- or ROLLBACK on error
```

---

### Q39. What are Transactions and Isolation Levels?

**Answer:**
Isolation levels define how/when changes are visible to concurrent transactions:

| Level | Dirty Read | Non-Repeatable Read | Phantom Read |
|---|---|---|---|
| READ UNCOMMITTED | ✅ Possible | ✅ | ✅ |
| READ COMMITTED (PG default) | ❌ | ✅ | ✅ |
| REPEATABLE READ | ❌ | ❌ | ✅ |
| SERIALIZABLE | ❌ | ❌ | ❌ |

For booking systems, `REPEATABLE READ` prevents double-booking scenarios.

---

### Q40. What are Window Functions?

**Answer:**
Window functions perform calculations across rows related to the current row without collapsing them like `GROUP BY`.

```sql
-- Rank bookings by amount per user
SELECT
  user_id,
  booking_date,
  amount,
  RANK() OVER (PARTITION BY user_id ORDER BY amount DESC) as rank,
  SUM(amount) OVER (PARTITION BY user_id) as total_spend
FROM bookings;
```

Common window functions: `ROW_NUMBER()`, `RANK()`, `DENSE_RANK()`, `LAG()`, `LEAD()`, `SUM() OVER`.

---

### Q41. How do you implement efficient pagination?

**Answer:**
Avoid `OFFSET` on large tables — it scans all rows up to the offset.

```sql
-- ❌ Slow OFFSET pagination
SELECT * FROM bookings ORDER BY id LIMIT 20 OFFSET 10000;

-- ✅ Cursor-based pagination (Keyset)
SELECT * FROM bookings
WHERE id > :last_seen_id
ORDER BY id
LIMIT 20;
```

Cursor-based pagination is O(log n) with an index vs O(n) for OFFSET.

---

### Q42. What is JSONB in PostgreSQL?

**Answer:**
JSONB stores JSON in a decomposed binary format — supports indexing, operators, and fast querying unlike plain JSON.

```sql
-- Query JSONB fields
SELECT * FROM supplier_events
WHERE payload->>'event_type' = 'booking_confirmed';

-- GIN index for JSONB
CREATE INDEX idx_gin_payload ON supplier_events USING GIN(payload);

-- Contains operator
SELECT * FROM supplier_events WHERE payload @> '{"status": "active"}';
```

**From your resume:** Supplier webhook data likely stored in JSONB.

---

### Q43. What are Materialized Views?

**Answer:**
Materialized views store the result of a query on disk, unlike regular views that re-execute on each query. Useful for expensive aggregations that don't need real-time data.

```sql
CREATE MATERIALIZED VIEW monthly_booking_summary AS
SELECT DATE_TRUNC('month', booking_date) as month,
       COUNT(*) as total_bookings,
       SUM(amount) as total_revenue
FROM bookings GROUP BY 1;

-- Refresh periodically (via cron job)
REFRESH MATERIALIZED VIEW CONCURRENTLY monthly_booking_summary;
```

---

## 7. REST API Questions

### Q44. What are REST API Best Practices?

**Answer:**
1. Use nouns not verbs in endpoints: `/users` not `/getUsers`
2. HTTP methods: GET (read), POST (create), PUT (full update), PATCH (partial update), DELETE
3. Consistent response structure: `{ data, error, meta }`
4. Proper HTTP status codes: 200, 201, 400, 401, 403, 404, 409, 422, 500
5. Versioning: `/api/v1/users`
6. Pagination with `limit/offset` or cursor
7. Filter/sort via query params: `?status=active&sort=created_at&order=desc`
8. Use HTTPS; rate limiting; authentication on all sensitive endpoints

---

### Q45. How do you implement API versioning?

**Answer:**
Three strategies:

```typescript
// 1. URL versioning (most common, clear)
@Controller({ path: 'users', version: '1' })
export class UserV1Controller {}

// 2. Header versioning
// Accept: application/vnd.api+json; version=1

// 3. Query param versioning
// GET /users?version=1
```

In NestJS:
```typescript
app.enableVersioning({ type: VersioningType.URI });
```

---

### Q46. How do you handle rate limiting?

**Answer:**
```typescript
// NestJS with @nestjs/throttler
@Module({
  imports: [ThrottlerModule.forRoot({ ttl: 60, limit: 100 })]
})

// Apply globally or per-controller
@UseGuards(ThrottlerGuard)
@Throttle(5, 60) // 5 requests per 60 seconds
@Post('login')
async login() {}
```

**Additional:** For distributed systems, use Redis-backed rate limiter so limits are shared across multiple server instances.

---

### Q47. What is API Caching? How do you implement it?

**Answer:**
Caching strategies:
- **In-memory (simple):** Store responses in memory (not distributed)
- **Redis cache:** Distributed, supports TTL, works across instances
- **HTTP caching:** `Cache-Control`, `ETag` headers for client-side caching

```typescript
// NestJS cache interceptor
@UseInterceptors(CacheInterceptor)
@CacheTTL(300) // 5 minutes
@Get('destinations')
async getDestinations() { ... }

// Manual Redis cache
async getUser(id: number) {
  const cached = await this.redis.get(`user:${id}`);
  if (cached) return JSON.parse(cached);
  
  const user = await this.userRepo.findById(id);
  await this.redis.setex(`user:${id}`, 300, JSON.stringify(user));
  return user;
}
```

---

## 8. Authentication & Authorization

### Q48. How do you implement JWT Authentication in NestJS?

**Answer:**
```typescript
// 1. Login — issue tokens
async login(dto: LoginDto) {
  const user = await this.validateUser(dto.email, dto.password);
  return {
    access_token: this.jwtService.sign({ sub: user.id, email: user.email }, { expiresIn: '15m' }),
    refresh_token: this.jwtService.sign({ sub: user.id }, { expiresIn: '7d' })
  };
}

// 2. JWT Strategy
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });
  }
  async validate(payload: JwtPayload) {
    return { id: payload.sub, email: payload.email };
  }
}

// 3. Protect route
@UseGuards(JwtAuthGuard)
@Get('profile')
getProfile(@Request() req) { return req.user; }
```

---

### Q49. What is the difference between Authentication and Authorization?

**Answer:**
- **Authentication:** Who are you? (verify identity — JWT token, session)
- **Authorization:** What can you do? (verify permissions — roles, scopes)

```typescript
// Roles-based authorization
@Roles('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Delete('users/:id')
deleteUser() {}
```

---

### Q50. How do you secure API keys and environment variables?

**Answer (From your resume):**
Used `.env` files with `dotenv`/`@nestjs/config` to separate secrets from code.

Best practices:
1. Never commit `.env` to Git (add to `.gitignore`)
2. Use environment-specific configs: `.env.development`, `.env.production`
3. Rotate secrets regularly
4. Use AWS Secrets Manager or Vault for production
5. Validate required env vars at startup

```typescript
// NestJS Config
ConfigModule.forRoot({ validationSchema: Joi.object({
  JWT_SECRET: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
}) })
```

---

## 9. WebSockets

### Q51. How do WebSockets work? How did you implement them?

**Answer:**
WebSockets provide a persistent, bidirectional connection between client and server, unlike HTTP request-response. After the initial HTTP upgrade handshake, both sides can send data at any time.

```typescript
// NestJS Gateway
@WebSocketGateway({ cors: { origin: '*' } })
@Injectable()
export class ReportGateway {
  @WebSocketServer() server: Server;

  // Emit progress to specific client
  sendProgress(clientId: string, progress: number) {
    this.server.to(clientId).emit('report-progress', { progress });
  }

  @SubscribeMessage('join-room')
  handleJoin(@MessageBody() room: string, @ConnectedSocket() client: Socket) {
    client.join(room);
  }
}
```

**From your resume:** Used for real-time features and reporting progress updates.

---

### Q52. WebSockets vs Server-Sent Events (SSE) vs Long Polling?

**Answer:**

| Feature   | WebSocket     | SSE                  | Long Polling |
|---        |---            |---                   |---|
| Direction | Bidirectional | Server → Client only | Client-initiated |
| Protocol  | ws://         | HTTP                  | HTTP       |
| Use case  | Chat, live collab | Progress updates, notifications | Legacy fallback |
| Complexity| Medium        | Low                   | Low |

For report progress (your use case), SSE would also work since data flows only server → client.

---

## 10. Bull Queue & Cron Jobs

### Q53. Why use Bull Queue instead of direct async processing?

**Answer:**
Direct async processing has problems:
- Server restart loses in-flight jobs
- No retry on failure
- Blocks the response if processing is slow
- No concurrency control

Bull Queue (Redis-backed) provides:
- **Persistence:** Jobs survive restarts
- **Retry with backoff:** Auto-retry failed jobs
- **Concurrency:** Control parallel workers
- **Priority:** High-priority jobs processed first
- **Monitoring:** Bull Board UI for job visibility

```typescript
@Process('generate-report')
async handleReport(job: Job<ReportDto>) {
  await job.progress(10);
  const data = await this.fetchData(job.data);
  await job.progress(50);
  const report = await this.buildReport(data);
  await job.progress(90);
  await this.s3Service.upload(report);
  await job.progress(100);
  return { reportUrl: s3Url };
}
```

---

### Q54. How do you handle failed jobs in Bull Queue?

**Answer:**
```typescript
// Job configuration with retry
await this.reportQueue.add('generate', data, {
  attempts: 3,
  backoff: { type: 'exponential', delay: 5000 },
  removeOnComplete: true,
  removeOnFail: false // Keep failed jobs for debugging
});

// Failed event handler
this.reportQueue.on('failed', (job, err) => {
  this.logger.error(`Job ${job.id} failed: ${err.message}`);
  this.notifyUser(job.data.userId, 'Report generation failed');
});
```

---

## 11. AWS & Deployment

### Q55. How did you implement S3 for image storage?

**Answer (From resume):**
```typescript
import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

@Injectable()
export class S3Service {
  private s3 = new S3Client({ region: process.env.AWS_REGION });

  async upload(file: Express.Multer.File, key: string): Promise<string> {
    await this.s3.send(new PutObjectCommand({
      Bucket: process.env.S3_BUCKET,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    }));
    return `https://${process.env.S3_BUCKET}.s3.amazonaws.com/${key}`;
  }

  async getPresignedUrl(key: string): Promise<string> {
    return getSignedUrl(this.s3, new GetObjectCommand({
      Bucket: process.env.S3_BUCKET, Key: key
    }), { expiresIn: 3600 });
  }
}
```

**Cost optimization:** Used S3 lifecycle policies to move old images to Glacier after 90 days.

---

### Q56. How did server-side rendering with HBS reduce AWS costs by 40%?

**Answer (From resume — IMPORTANT to explain clearly):**
The original onboarding flow was a React SPA. Each user downloaded the full React bundle (~500KB+), all JS/CSS assets, and then made API calls to populate the page. This incurred:
- High data transfer costs from EC2/CloudFront
- High Lambda/server compute for API calls

By replacing with **Handlebars (HBS) server-side rendering:**
1. Server pre-renders HTML with data already embedded
2. Client receives complete HTML — no additional API calls
3. Significantly smaller payload (HTML vs JS bundle)
4. Reduced EC2 compute (fewer API calls)
5. Faster Time To First Contentful Paint

Result: 40% reduction in hosting costs.

---

### Q57. EC2 vs Vercel vs Container deployment — which would you choose when?

**Answer:**
- **Vercel:** Frontend apps, Next.js — zero-config, CDN-backed, great DX
- **EC2:** Full control, NestJS APIs, background workers, custom configs
- **Docker + ECS/EKS:** When you need container orchestration, multiple services, microservices
- **Lambda:** Stateless, short-lived functions, event-driven workloads

For your current stack: NestJS on EC2/ECS with Docker, Angular on Vercel/S3+CloudFront is a common production pattern.

---

## 12. System Design

### Q58. Design a Survey System (relevant to your domain)

**Answer:**

**Requirements:**
- Users create surveys with multiple question types
- Share survey links with respondents
- Real-time response collection
- Analytics dashboard

**High-Level Design:**
```
Client (Angular) → API Gateway → NestJS API → PostgreSQL
                                           → Redis (cache)
                                           → Bull Queue (analytics)
                                           → S3 (media)
                                           → WebSocket (real-time)
```

**Database Schema (key tables):**
- `surveys` (id, title, owner_id, status, settings JSONB)
- `questions` (id, survey_id, type, text, options JSONB, order)
- `responses` (id, survey_id, respondent_id, submitted_at)
- `answers` (id, response_id, question_id, value JSONB)

**Key Design Decisions:**
- Store question options and answer values in JSONB for flexibility
- Use ARRAY_AGG/JSON_AGG for analytics queries (your experience)
- Cache analytics in Redis/Materialized Views (refresh via cron)
- Bull Queue for generating large CSV exports

---

### Q59. Design a Notification System

**Requirements:** Send email, push, SMS notifications; handle high volume; guarantee delivery.

**Architecture:**
```
Event Source → Bull Queue → Notification Workers → Channel Providers
                         ├── Email Worker → SES/SendGrid
                         ├── Push Worker → FCM/APNs
                         └── SMS Worker → Twilio
```

**Key Decisions:**
- Separate queues per channel for independent scaling
- Retry with exponential backoff
- Dead Letter Queue for permanently failed notifications
- User preference service: check if user has opted out
- Template service for notification content

---

### Q60. Design a File Upload System (S3-based)

**Architecture:**
1. Client requests pre-signed upload URL from API
2. API generates S3 pre-signed URL (valid 10 min)
3. Client uploads directly to S3 (bypasses your server)
4. S3 triggers Lambda/webhook on upload complete
5. API updates database with S3 key

**Benefits of pre-signed URLs:**
- Server never handles file bytes (saves bandwidth/memory)
- S3 handles scalability
- Files go directly to S3 (faster for large files)

---

## 13. Angular Questions

### Q61. What changes did you make during Angular v11 to v15 migration?

**Answer (From resume — KEY project question):**
The migration involved several steps and improvements:

1. **Incremental version upgrades:** v11→v12→v13→v14→v15 using `ng update`
2. **Lazy loading:** Converted eager-loaded feature modules to lazy-loaded with `loadChildren`
3. **AOT Compilation:** Ensured all components are AOT-compatible (removed dynamic templates)
4. **Change Detection:** Switched from `Default` to `OnPush` for performance-critical components
5. **Standalone Components (v15):** Migrated some components to standalone API
6. **Ivy Renderer:** Fully enabled (default from v12+), smaller bundles
7. **Node/TypeScript version upgrades** throughout

**Result:** Reduced initial bundle size, faster TTI (Time to Interactive).

---

### Q62. Explain Change Detection in Angular. What is OnPush?

**Answer:**
Angular's default change detection checks every component in the tree on any change. `OnPush` makes a component only check when:
1. Its `@Input()` reference changes
2. An event originates from the component
3. An Observable emits via `async` pipe
4. `markForCheck()` is called manually

```typescript
@Component({
  selector: 'app-booking-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div *ngFor="let item of bookings$ | async">{{item.name}}</div>`
})
```

**Performance impact:** In a list of 100 components, `OnPush` can reduce checks by 90%+.

---

### Q63. What is RxJS? How did you use it in your project?

**Answer:**
RxJS (Reactive Extensions for JavaScript) is a library for composing asynchronous streams using Observables.

Key operators used:
- `switchMap` — cancel previous HTTP request when new search query comes
- `debounceTime` — wait 300ms after user stops typing before searching
- `combineLatest` — combine multiple data streams for dashboard
- `takeUntil` — auto-unsubscribe to prevent memory leaks
- `catchError` — handle errors without breaking the stream
- `shareReplay` — share data across multiple subscribers (cache)

```typescript
// Search with debounce and switchMap
this.searchControl.valueChanges.pipe(
  debounceTime(300),
  distinctUntilChanged(),
  switchMap(query => this.apiService.search(query)),
  takeUntil(this.destroy$)
).subscribe(results => this.results = results);
```

---

### Q64. How do you prevent memory leaks in Angular?

**Answer:**
```typescript
// Pattern 1: takeUntil with Subject
private destroy$ = new Subject<void>();

ngOnInit() {
  this.service.getData().pipe(
    takeUntil(this.destroy$)
  ).subscribe(data => this.data = data);
}

ngOnDestroy() {
  this.destroy$.next();
  this.destroy$.complete();
}

// Pattern 2: async pipe (auto-unsubscribes)
// Template: {{ data$ | async }}

// Pattern 3: Manual unsubscribe
private sub: Subscription;
ngOnDestroy() { this.sub?.unsubscribe(); }
```

---

### Q65. What is Lazy Loading in Angular and how did you implement it?

**Answer:**
Lazy loading defers loading feature modules until they are needed (route activated), reducing initial bundle size.

```typescript
// app-routing.module.ts
const routes: Routes = [
  {
    path: 'bookings',
    loadChildren: () => import('./bookings/bookings.module')
      .then(m => m.BookingsModule)
  },
  {
    path: 'reports',
    loadChildren: () => import('./reports/reports.module')
      .then(m => m.ReportsModule)
  }
];
```

**Impact in your project:** Only the landing page loaded initially; feature modules loaded on demand.

---

## 14. Project-Based Questions

### Q66. "Tell me about your main project at Oneclick IT."

**Sample Answer:**
"I work on a travel booking and survey management platform. On the frontend, I own the Angular application — I led the migration from v11 to v15, which involved lazy loading, OnPush change detection, and AOT optimization. We saw a significant reduction in bundle size and faster load times.

On the backend with NestJS, my key contributions include a Bull Queue-based report generation system — this was important because generating reports for thousands of bookings was timing out. By queuing the job and processing it asynchronously, we eliminated timeouts completely. I also built the AWS S3 pipeline for travel asset management and designed PostgreSQL schemas using JSON_AGG and ARRAY_AGG to handle complex travel data queries efficiently. One achievement I'm proud of is replacing a React-based onboarding flow with HBS server-side rendering, which cut AWS hosting costs by 40%."

---

### Q67. "What was the biggest technical challenge you faced?"

**Sample Answer:**
"The report generation feature was a significant challenge. Initially, the API would time out when generating reports for large datasets. The first instinct was to just increase the timeout, but that's a band-aid. I re-architected it using Bull Queue — the API now immediately returns a `jobId`, the heavy processing happens in a background worker, and the client receives real-time progress via WebSockets. This was also my first time combining queues with WebSockets and designing a proper async job tracking system."

---

### Q68. "What would you improve in your current project if you had 2 weeks?"

**Sample Answer:**
1. **Add Redis caching** for frequently read reference data (destinations, travel packages) — currently every request hits PostgreSQL
2. **Implement database connection pooling** tuning — review PgBouncer settings
3. **Add comprehensive API documentation** with Swagger/OpenAPI
4. **Write integration tests** for the critical booking and payment flows
5. **Implement proper distributed tracing** (OpenTelemetry) across the queue workers

---

## 15. Behavioral Questions

### Q69. Tell me about yourself.

**Sample Answer:**
"I'm a Full Stack Developer with about 3 years of experience, currently at Oneclick IT Consultancy in Ahmedabad. My core stack is Angular on the frontend and NestJS/Node.js on the backend with PostgreSQL. I've worked on a travel tech platform where I've done everything from migrating Angular versions to designing PostgreSQL schemas and building queue-based background processing systems. I'm particularly interested in performance optimization — I reduced hosting costs by 40% through an SSR change and built a Bull Queue system that eliminated report generation timeouts. I'm now looking for a role where I can work on larger-scale systems and deepen my backend architecture experience."

---

### Q70. Describe a time you improved system performance.

**Sample Answer (STAR format):**
**Situation:** Our report generation API was timing out for large datasets — anything over 10,000 records would fail.
**Task:** Fix the timeouts without compromising the user experience.
**Action:** Analyzed the bottleneck — it was both the DB query time and the synchronous response waiting. I introduced Bull Queue to make it asynchronous, optimized the PostgreSQL query using ARRAY_AGG instead of N+1 queries, and added WebSocket progress notifications.
**Result:** Eliminated all timeouts, processing time for 50,000-record reports went from "failed" to completing in ~45 seconds in the background, while users got real-time progress updates.

---

### Q71. How do you handle disagreements with a senior developer?

**Sample Answer:**
"I approach it collaboratively — I first make sure I fully understand their perspective and reasoning. If I still believe my approach is better, I prepare a data-driven case: benchmarks, examples, trade-offs. I'll say something like 'I see the merit in your approach, here's an alternative I want to share — can we weigh the trade-offs together?' Ultimately, if we can't align, I defer to the team lead or suggest a quick proof-of-concept to let the data decide. The goal is always the best outcome for the product, not winning the argument."

---

### Q72. How do you handle production incidents?

**Sample Answer:**
1. **Triage first:** Is it causing data loss? Is it affecting all users? Communicate status immediately.
2. **Quick rollback** if a recent deployment is the cause — reduce blast radius.
3. **Investigate with logs, APM tools** — identify root cause without guessing.
4. **Fix and deploy** with proper testing.
5. **Post-mortem:** Document what happened, why, and add monitoring/alerts to catch it earlier next time.

"I believe the most important thing is communication — keep stakeholders informed even when you don't have all the answers yet."

---

## 16. Manager Round Questions

### Q73. Where do you see yourself in 3 years?

**Sample Answer:**
"In 3 years, I want to grow into a Senior Engineer role where I'm not just writing code but shaping architectural decisions. I want to go deeper on system design — distributed systems, event-driven architectures, high-availability systems. I also want to start mentoring junior developers; I find that explaining concepts clearly helps me understand them better. At Movate, I'm excited about the scale of problems — working on larger teams and systems is exactly the kind of challenge I'm looking for."

---

### Q74. How do you estimate tasks?

**Sample Answer:**
"I break the task into sub-tasks and estimate each. I consider: setup time, development, writing tests, code review cycles, and integration. I use T-shirt sizing initially (S/M/L) to align with stakeholders, then convert to story points or hours for sprint planning. I always add a 20% buffer for unknowns — especially for features touching unfamiliar codebases. I also flag dependencies early — if my task is blocked by another team's API, the estimate needs to reflect that uncertainty."

---

### Q75. How do you ensure code quality?

**Answer:**
1. **ESLint/Prettier** — automated code style
2. **Code reviews** — at least one reviewer before merge
3. **DTOs + ValidationPipe** — no invalid data enters the system
4. **Unit tests** for business logic, integration tests for APIs
5. **Consistent patterns** — follow NestJS module structure, naming conventions
6. **Swagger documentation** — API contracts visible to everyone
7. **Environment separation** — dev/staging/production configs isolated

---

## 17. JD-Specific Questions (Movate)

> **Movate Role: Full Stack Developer (Angular + Node.js)**

### Q76. ⭐ HIGH PRIORITY: How comfortable are you with Express.js vs NestJS?

**Answer:**
"My primary backend experience is with NestJS, which is built on top of Express.js. NestJS gives you all of Express's power — middleware, routing, request/response cycle — plus a structured opinionated architecture. I understand Express fundamentals well: `app.use()`, middleware chains, error handling with `(err, req, res, next)`, router modularization. Moving from NestJS to a pure Express project would be straightforward — I'd essentially be building the structure that NestJS provides out of the box."

---

### Q77. ⭐ HIGH PRIORITY: Explain a time you built scalable and secure solutions.

**Answer:**
"The Bull Queue report system I built is a good example of scalability — it horizontally scales by adding more queue workers without touching the API. For security, I implemented JWT with short expiry + refresh token rotation, input validation on all endpoints via DTOs, environment variable isolation, parameterized queries to prevent SQL injection, and webhook signature validation for third-party suppliers."

---

### Q78. ⭐ HIGH PRIORITY: How do you write clean, maintainable code?

**Answer:**
- Follow **SOLID principles** — especially Single Responsibility
- **Modular architecture** — each NestJS module owns its domain
- **Descriptive naming** — code should read like prose
- **Small functions** — each does one thing
- **DTO/validation layer** — clear contracts at API boundaries
- **Constants/enums** instead of magic strings
- **Comments for WHY, not WHAT** — the code shows what; comments explain decisions

---

### Q79. ⭐ HIGH PRIORITY: How do you debug a production issue?

**Answer:**
1. Check monitoring/logs (CloudWatch, Datadog) for error spikes and traces
2. Reproduce in staging if possible
3. Check recent deployments — was there a release close to the issue?
4. Add targeted logging without redeploying (feature flags/debug mode)
5. Use Node.js profiler if it's a performance issue
6. Fix → test → deploy → verify

"In one incident, our booking confirmation emails stopped sending. I traced it in the Bull Queue logs — the email worker was failing silently due to an expired SMTP credential. I updated the credential, triggered job retries, and added alerting for email delivery failures."

---

### Q80. ⭐ MEDIUM PRIORITY: Experience with Agile/Scrum?

**Answer:**
"Yes, my current role follows Agile with 2-week sprints. I participate in sprint planning (estimation, task breakdown), daily standups (blockers, progress), sprint reviews (demo to stakeholders), and retrospectives. I've worked with Jira for task tracking. I'm comfortable with the rhythm of Agile and appreciate how it creates regular feedback loops — especially the retrospectives, which helped us identify and fix our deployment process."

---

### Q81. ⭐ MEDIUM PRIORITY: How do you ensure application security?

**Answer (Covering JD's security requirement):**
1. Authentication via JWT — access token (15min) + refresh token (7 days)
2. Role-based authorization with Guards
3. Input validation via DTOs + class-validator
4. SQL injection prevention via parameterized queries/ORM
5. XSS prevention — sanitize HTML outputs
6. CORS — whitelist specific origins
7. Rate limiting — prevent brute force
8. Secrets in environment variables, never in code
9. HTTPS everywhere
10. Webhook signature validation (HMAC)

---

### Q82. NICE-TO-KNOW: Any experience with microservices?

**Answer:**
"I have conceptual experience and have worked with modular architecture in NestJS which lays the foundation for microservices. NestJS has built-in support for microservices with various transports (TCP, Redis, RabbitMQ, Kafka). Our current system has a modular monolith design — separate modules for booking, reports, notifications — which could be extracted into microservices. I understand the trade-offs: microservices give you independent deployment and scaling but add distributed systems complexity (service discovery, distributed transactions, network latency)."

---

## 18. Rapid-Fire Questions

| Question | Answer |
|---|---|
| What is `undefined` vs `null`? | `undefined` = declared but not assigned; `null` = intentionally empty |
| What is `typeof null`? | `"object"` — a historical JS bug |
| What is the difference between `let`, `const`, `var`? | `var`: function-scoped, hoisted; `let`/`const`: block-scoped, TDZ; `const`: can't reassign |
| What is `NaN`? | "Not a Number" — result of invalid math; `NaN !== NaN` (use `isNaN()`) |
| What does `use strict` do? | Enables strict mode — prevents use of undeclared variables, safer `this` |
| What is a Pure Function? | Same inputs always give same output; no side effects |
| What is idempotent in REST? | Repeated calls produce same result — GET, PUT, DELETE are idempotent; POST is not |
| HTTP 401 vs 403? | 401 = Unauthenticated (login first); 403 = Forbidden (logged in but no permission) |
| What is CORS? | Cross-Origin Resource Sharing — browser security policy; server must allow cross-origin requests |
| What is a deadlock in PostgreSQL? | Two transactions each waiting for the other to release a lock — PG auto-detects and kills one |
| What is connection pooling? | Reusing DB connections instead of creating new ones for each request (PgBouncer, Typeorm pool) |
| What is a CDN? | Content Delivery Network — distributes static assets globally for faster delivery |
| What is Docker? | Containerization platform — package app with all dependencies for consistent environments |
| What is the purpose of `.gitignore`? | Tells Git which files/folders to not track (node_modules, .env, dist) |
| What is Swagger? | OpenAPI specification tool for documenting REST APIs interactively |

---

## 19. 50 Most Important Questions

1. Explain the JavaScript Event Loop with an example
2. What are Closures and how can they cause memory leaks?
3. Promises vs Async/Await vs Callbacks
4. What is `this` in an arrow function vs regular function?
5. TypeScript Generics — explain with a real example
6. Types vs Interfaces in TypeScript
7. What are Utility Types? Name 5 with examples
8. How does Node.js handle concurrency?
9. What are Streams in Node.js and when would you use them?
10. Node.js Clustering vs Worker Threads
11. NestJS architecture — explain all building blocks
12. Guards vs Middleware vs Interceptors — what's the difference?
13. How does DI work in NestJS?
14. What are DTOs and why are they important?
15. How do you implement JWT authentication in NestJS?
16. Explain Bull Queue — why, when, and how did you use it?
17. How do Cron Jobs work in NestJS?
18. PostgreSQL indexes — types and when to use each
19. EXPLAIN ANALYZE — how do you use it?
20. ARRAY_AGG vs JSON_AGG — explain with examples
21. ACID properties with real-world example
22. Transaction isolation levels — what does each prevent?
23. Cursor-based vs OFFSET pagination — why is cursor better?
24. Window functions — ROW_NUMBER, RANK, LAG with examples
25. JSONB in PostgreSQL — operators and indexing
26. REST API best practices — status codes, versioning, pagination
27. Rate limiting — implementation in NestJS
28. How do you implement caching in a Node.js API?
29. WebSockets — how they work and when to use vs HTTP
30. AWS S3 — how did you build the image upload pipeline?
31. How did HBS SSR reduce your AWS costs by 40%?
32. Angular migration v11 to v15 — what did you change?
33. Change Detection in Angular — Default vs OnPush
34. RxJS — explain operators you use daily
35. Lazy loading in Angular — implementation
36. How do you prevent memory leaks in Angular?
37. Design a survey system from scratch
38. Design a notification system at scale
39. How do you handle errors globally in NestJS?
40. How do you secure environment variables?
41. What is the Temporal Dead Zone?
42. Debouncing vs Throttling — implementation and use cases
43. How do you handle N+1 query problems?
44. Explain materialized views and when to use them
45. What are Decorators in TypeScript/NestJS?
46. How do you write testable NestJS services?
47. What is Dependency Injection and why is it important?
48. How do you approach debugging a production issue?
49. How do you estimate a complex feature?
50. What would you improve in your current system if you had 2 weeks?

---

## 20. 20 Frequently Asked Follow-Up Questions

1. **After explaining Event Loop:** "What happens if you have a heavy CPU task in Node.js? How do you fix it?"
2. **After JWT answer:** "What do you store in the JWT payload? Why not store sensitive data there?"
3. **After Bull Queue:** "What happens if Redis goes down? How does Bull handle it?"
4. **After PostgreSQL index:** "Can too many indexes be a problem? Why?"
5. **After ACID:** "How does PostgreSQL implement Atomicity at the hardware level?"
6. **After WebSockets:** "How do you scale WebSockets across multiple server instances?"
7. **After S3 answer:** "How do you handle large file uploads — say 1GB files?"
8. **After Angular migration:** "How did you handle breaking changes between Angular versions?"
9. **After OnPush change detection:** "What is Zone.js and how does Angular use it?"
10. **After NestJS Guards:** "Can you have multiple guards on one route? What order do they run in?"
11. **After Generics:** "What is the difference between `T extends object` and `T extends Record<string, unknown>`?"
12. **After REST API design:** "How do you handle API backward compatibility when you need to change a response structure?"
13. **After caching:** "How do you handle cache invalidation? What's the strategy?"
14. **After JSONB:** "When would you use a separate table vs JSONB for dynamic data?"
15. **After system design:** "How do you handle the case where a queue worker crashes mid-job?"
16. **After Closures:** "What is a WeakMap and when would you use it over a Map?"
17. **After debounce:** "Implement debounce without using `clearTimeout`."
18. **After Interceptors:** "Can an interceptor both modify the request AND the response?"
19. **After behavioral question:** "Give a specific example — don't just describe the process."
20. **After pagination:** "How do you implement infinite scroll with cursor-based pagination?"

---

## 21. One Day Before Interview Revision Sheet 🗒️

### ⚡ Your Key Numbers (Memorize These)
- **40%** — AWS cost reduction via HBS SSR
- **Angular v11 → v15** — migration you led
- **3 years** — total experience
- **Bull Queue + WebSockets** — your async report architecture
- **ARRAY_AGG, JSON_AGG** — PostgreSQL techniques you used
- **AWS S3, EC2** — services you've worked with

---

### ⚡ Core Concepts — 30-Second Answers

**Event Loop:** Call Stack → Microtasks (Promises) → Macrotasks (setTimeout). JS is single-threaded; async via callbacks.

**Closure:** Function remembers its outer scope. Used for counters, memoization, module patterns.

**JWT:** Header.Payload.Signature. Stateless auth. Access token (15min) + Refresh token (7d). Store in httpOnly cookie or memory (not localStorage).

**Bull Queue:** Redis-backed job queue. Async processing, retry, concurrency, persistence. Used for reports/emails.

**OnPush Change Detection:** Component only checked when @Input reference changes / event / async pipe. Huge performance win.

**ARRAY_AGG/JSON_AGG:** Aggregate multiple rows into array/JSON. Eliminates N+1 queries.

**Cursor Pagination:** `WHERE id > :last_id LIMIT 20`. O(log n) vs OFFSET's O(n).

**Guards vs Middleware:** Guards make auth decisions (return boolean), have ExecutionContext. Middleware just calls next().

**SSR cost reduction:** Pre-rendered HTML = smaller payload, fewer API calls, less compute.

**ACID:** Atomic (all-or-nothing), Consistent (constraints maintained), Isolated (concurrent transactions safe), Durable (committed = persisted).

---

### ⚡ Phrases That Impress Interviewers
- *"I measured before optimizing — used EXPLAIN ANALYZE to identify the bottleneck"*
- *"Instead of increasing the timeout, I re-architected it to be asynchronous"*
- *"I chose this approach because of the trade-off between X and Y"*
- *"In production, we found that... so I added monitoring for it"*
- *"The 40% cost reduction came from eliminating unnecessary API calls and reducing payload size"*
- *"I write code for the next developer who will maintain it, not just for today"*

---

### ⚡ Questions to Ask the Interviewer
1. "What does the tech stack look like on the Node.js side — Express or a framework like NestJS?"
2. "What are the biggest technical challenges the team is currently solving?"
3. "How does the team handle code reviews and technical debt?"
4. "What does the onboarding process look like for new engineers?"
5. "What would a successful first 90 days look like for this role?"

---

### ⚡ Last-Minute Checklist
- [ ] Read Movate's website/products before the interview
- [ ] Prepare 2-3 specific examples for behavioral questions (STAR format)
- [ ] Know your resume numbers cold (40%, v11→v15, etc.)
- [ ] Prepare your "tell me about yourself" in under 2 minutes
- [ ] Test your webcam/mic/internet if it's a video call
- [ ] Have Postman/code editor open in case they ask you to code live
- [ ] Sleep well — you know this material

---

*Document generated for Suraj Bhoji | Target Role: Full Stack Developer @ Movate | June 2026*
*200+ questions covering JavaScript, TypeScript, Node.js, NestJS, PostgreSQL, Angular, System Design, and Behavioral*