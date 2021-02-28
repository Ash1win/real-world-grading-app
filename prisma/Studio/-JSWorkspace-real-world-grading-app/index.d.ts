import {
  DMMF,
  DMMFClass,
  Engine,
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
  sqltag as sql,
  empty,
  join,
  raw,
} from './runtime';

export { PrismaClientKnownRequestError }
export { PrismaClientUnknownRequestError }
export { PrismaClientRustPanicError }
export { PrismaClientInitializationError }
export { PrismaClientValidationError }

/**
 * Re-export of sql-template-tag
 */
export { sql, empty, join, raw }

/**
 * Prisma Client JS version: 2.3.0
 * Query Engine version: e11114fa1ea826f9e7b4fa1ced34e78892fe8e0e
 */
export declare type PrismaVersion = {
  client: string
}

export declare const prismaVersion: PrismaVersion 

/**
 * Utility Types
 */

/**
 * From https://github.com/sindresorhus/type-fest/
 * Matches a JSON object.
 * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from. 
 */
export declare type JsonObject = {[Key in string]?: JsonValue}
 
/**
 * From https://github.com/sindresorhus/type-fest/
 * Matches a JSON array.
 */
export declare interface JsonArray extends Array<JsonValue> {}
 
/**
 * From https://github.com/sindresorhus/type-fest/
 * Matches any valid JSON value.
 */
export declare type JsonValue = string | number | boolean | null | JsonObject | JsonArray

/**
 * Same as JsonObject, but allows undefined
 */
export declare type InputJsonObject = {[Key in string]?: JsonValue}
 
export declare interface InputJsonArray extends Array<JsonValue> {}
 
export declare type InputJsonValue = undefined |  string | number | boolean | null | InputJsonObject | InputJsonArray

declare type SelectAndInclude = {
  select: any
  include: any
}

declare type HasSelect = {
  select: any
}

declare type HasInclude = {
  include: any
}

declare type CheckSelect<T, S, U> = T extends SelectAndInclude
  ? 'Please either choose `select` or `include`'
  : T extends HasSelect
  ? U
  : T extends HasInclude
  ? U
  : S

/**
 * Get the type of the value, that the Promise holds.
 */
export declare type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

/**
 * Get the return type of a function which returns a Promise.
 */
export declare type PromiseReturnType<T extends (...args: any) => Promise<any>> = PromiseType<ReturnType<T>>


export declare type Enumerable<T> = T | Array<T>;

export declare type TrueKeys<T> = {
  [key in keyof T]: T[key] extends false | undefined | null ? never : key
}[keyof T]

/**
 * Subset
 * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
 */
export declare type Subset<T, U> = {
  [key in keyof T]: key extends keyof U ? T[key] : never;
};
declare class PrismaClientFetcher {
  private readonly prisma;
  private readonly debug;
  private readonly hooks?;
  constructor(prisma: PrismaClient<any, any>, debug?: boolean, hooks?: Hooks | undefined);
  request<T>(document: any, dataPath?: string[], rootField?: string, typeName?: string, isList?: boolean, callsite?: string): Promise<T>;
  sanitizeMessage(message: string): string;
  protected unpack(document: any, data: any, path: string[], rootField?: string, isList?: boolean): any;
}


/**
 * Client
**/

export declare type Datasource = {
  url?: string
}

export type Datasources = {
  db?: Datasource
}

export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'

export interface PrismaClientOptions {
  /**
   * Overwrites the datasource url from your prisma.schema file
   */
  datasources?: Datasources

  /**
   * @default "colorless"
   */
  errorFormat?: ErrorFormat

  /**
   * @example
   * ```
   * // Defaults to stdout
   * log: ['query', 'info', 'warn', 'error']
   * 
   * // Emit as events
   * log: [
   *  { emit: 'stdout', level: 'query' },
   *  { emit: 'stdout', level: 'info' },
   *  { emit: 'stdout', level: 'warn' }
   *  { emit: 'stdout', level: 'error' }
   * ]
   * ```
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
   */
  log?: Array<LogLevel | LogDefinition>
}

export type Hooks = {
  beforeRequest?: (options: {query: string, path: string[], rootField?: string, typeName?: string, document: any}) => any
}

/* Types for Logging */
export type LogLevel = 'info' | 'query' | 'warn' | 'error'
export type LogDefinition = {
  level: LogLevel
  emit: 'stdout' | 'event'
}

export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
export type GetEvents<T extends Array<LogLevel | LogDefinition>> = GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]> 

export type QueryEvent = {
  timestamp: Date
  query: string
  params: string
  duration: number
  target: string
}

export type LogEvent = {
  timestamp: Date
  message: string
  target: string
}
/* End Types for Logging */


export type Action =
  | 'findOne'
  | 'findMany'
  | 'create'
  | 'update'
  | 'updateMany'
  | 'upsert'
  | 'delete'
  | 'deleteMany'
  | 'executeRaw'
  | 'queryRaw'
  | 'aggregate'

/**
 * These options are being passed in to the middleware as "params"
 */
export type MiddlewareParams = {
  model?: string
  action: Action
  args: any
  dataPath: string[]
  runInTransaction: boolean
}

/**
 * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
 */
export type Middleware<T = any> = (
  params: MiddlewareParams,
  next: (params: MiddlewareParams) => Promise<T>,
) => Promise<T>

// tested in getLogLevel.test.ts
export declare function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js (ORM replacement)
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://github.com/prisma/prisma/blob/master/docs/prisma-client-js/api.md).
 */
export declare class PrismaClient<
  T extends PrismaClientOptions = PrismaClientOptions,
  U = keyof T extends 'log' ? T['log'] extends Array<LogLevel | LogDefinition> ? GetEvents<T['log']> : never : never
> {
  /**
   * @private
   */
  private fetcher;
  /**
   * @private
   */
  private readonly dmmf;
  /**
   * @private
   */
  private connectionPromise?;
  /**
   * @private
   */
  private disconnectionPromise?;
  /**
   * @private
   */
  private readonly engineConfig;
  /**
   * @private
   */
  private readonly measurePerformance;
  /**
   * @private
   */
  private engine: Engine;
  /**
   * @private
   */
  private errorFormat: ErrorFormat;

  /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js (ORM replacement)
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://github.com/prisma/prisma/blob/master/docs/prisma-client-js/api.md).
   */
  constructor(optionsArg?: T);
  on<V extends U>(eventType: V, callback: (event: V extends 'query' ? QueryEvent : LogEvent) => void): void;
  /**
   * Connect with the database
   */
  connect(): Promise<void>;
  /**
   * @private
   */
  private runDisconnect;
  /**
   * Disconnect from the database
   */
  disconnect(): Promise<any>;

  

  /**
   * Executes a raw query and returns the number of affected rows
   * @example
   * ```
   * // With parameters use prisma.executeRaw``, values will be escaped automatically
   * const result = await prisma.executeRaw`UPDATE User SET cool = ${true} WHERE id = ${1};`
   * // Or
   * const result = await prisma.executeRaw('UPDATE User SET cool = $1 WHERE id = $2 ;', true, 1)
  * ```
  * 
  * Read more in our [docs](https://github.com/prisma/prisma/blob/master/docs/prisma-client-js/api.md#raw-database-access).
  */
  executeRaw<T = any>(query: string | TemplateStringsArray, ...values: any[]): Promise<number>;

  /**
   * Performs a raw query and returns the SELECT data
   * @example
   * ```
   * // With parameters use prisma.queryRaw``, values will be escaped automatically
   * const result = await prisma.queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'ema.il'};`
   * // Or
   * const result = await prisma.queryRaw('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'ema.il')
  * ```
  * 
  * Read more in our [docs](https://github.com/prisma/prisma/blob/master/docs/prisma-client-js/api.md#raw-database-access).
  */
  queryRaw<T = any>(query: string | TemplateStringsArray, ...values: any[]): Promise<T>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): UserDelegate;

  /**
   * `prisma.course`: Exposes CRUD operations for the **Course** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Courses
    * const courses = await prisma.course.findMany()
    * ```
    */
  get course(): CourseDelegate;

  /**
   * `prisma.courseEnrollment`: Exposes CRUD operations for the **CourseEnrollment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CourseEnrollments
    * const courseEnrollments = await prisma.courseEnrollment.findMany()
    * ```
    */
  get courseEnrollment(): CourseEnrollmentDelegate;

  /**
   * `prisma.test`: Exposes CRUD operations for the **Test** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tests
    * const tests = await prisma.test.findMany()
    * ```
    */
  get test(): TestDelegate;

  /**
   * `prisma.testResult`: Exposes CRUD operations for the **TestResult** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TestResults
    * const testResults = await prisma.testResult.findMany()
    * ```
    */
  get testResult(): TestResultDelegate;
}



/**
 * Enums
 */

// Based on
// https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

export declare const OrderByArg: {
  asc: 'asc',
  desc: 'desc'
};

export declare type OrderByArg = (typeof OrderByArg)[keyof typeof OrderByArg]


export declare const UserRole: {
  STUDENT: 'STUDENT',
  TEACHER: 'TEACHER'
};

export declare type UserRole = (typeof UserRole)[keyof typeof UserRole]



/**
 * Model User
 */

export type User = {
  id: number
  email: string
  firstName: string
  lastName: string
  social: JsonValue
}



export type UserSelect = {
  id?: boolean
  email?: boolean
  firstName?: boolean
  lastName?: boolean
  social?: boolean
  courses?: boolean | FindManyCourseEnrollmentArgs
  testResults?: boolean | FindManyTestResultArgs
  testGraded?: boolean | FindManyTestResultArgs
}

export type UserInclude = {
  courses?: boolean | FindManyCourseEnrollmentArgs
  testResults?: boolean | FindManyTestResultArgs
  testGraded?: boolean | FindManyTestResultArgs
}

export type UserGetPayload<
  S extends boolean | null | undefined | UserArgs,
  U = keyof S
> = S extends true
  ? User
  : S extends undefined
  ? never
  : S extends UserArgs | FindManyUserArgs
  ? 'include' extends U
    ? User  & {
      [P in TrueKeys<S['include']>]:
      P extends 'courses'
      ? Array<CourseEnrollmentGetPayload<S['include'][P]>> :
      P extends 'testResults'
      ? Array<TestResultGetPayload<S['include'][P]>> :
      P extends 'testGraded'
      ? Array<TestResultGetPayload<S['include'][P]>> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof User ? User[P]
: 
      P extends 'courses'
      ? Array<CourseEnrollmentGetPayload<S['select'][P]>> :
      P extends 'testResults'
      ? Array<TestResultGetPayload<S['select'][P]>> :
      P extends 'testGraded'
      ? Array<TestResultGetPayload<S['select'][P]>> : never
    }
  : User
: User


export interface UserDelegate {
  /**
   * Find zero or one User.
   * @param {FindOneUserArgs} args - Arguments to find a User
   * @example
   * // Get one User
   * const user = await prisma.user.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneUserArgs>(
    args: Subset<T, FindOneUserArgs>
  ): CheckSelect<T, Prisma__UserClient<User | null>, Prisma__UserClient<UserGetPayload<T> | null>>
  /**
   * Find zero or more Users.
   * @param {FindManyUserArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Users
   * const users = await prisma.user.findMany()
   * 
   * // Get first 10 Users
   * const users = await prisma.user.findMany({ take: 10 })
   * 
   * // Only select the `id`
   * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManyUserArgs>(
    args?: Subset<T, FindManyUserArgs>
  ): CheckSelect<T, Promise<Array<User>>, Promise<Array<UserGetPayload<T>>>>
  /**
   * Create a User.
   * @param {UserCreateArgs} args - Arguments to create a User.
   * @example
   * // Create one User
   * const User = await prisma.user.create({
   *   data: {
   *     // ... data to create a User
   *   }
   * })
   * 
  **/
  create<T extends UserCreateArgs>(
    args: Subset<T, UserCreateArgs>
  ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>
  /**
   * Delete a User.
   * @param {UserDeleteArgs} args - Arguments to delete one User.
   * @example
   * // Delete one User
   * const User = await prisma.user.delete({
   *   where: {
   *     // ... filter to delete one User
   *   }
   * })
   * 
  **/
  delete<T extends UserDeleteArgs>(
    args: Subset<T, UserDeleteArgs>
  ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>
  /**
   * Update one User.
   * @param {UserUpdateArgs} args - Arguments to update one User.
   * @example
   * // Update one User
   * const user = await prisma.user.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends UserUpdateArgs>(
    args: Subset<T, UserUpdateArgs>
  ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>
  /**
   * Delete zero or more Users.
   * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
   * @example
   * // Delete a few Users
   * const { count } = await prisma.user.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends UserDeleteManyArgs>(
    args: Subset<T, UserDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Users.
   * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Users
   * const user = await prisma.user.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends UserUpdateManyArgs>(
    args: Subset<T, UserUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one User.
   * @param {UserUpsertArgs} args - Arguments to update or create a User.
   * @example
   * // Update or create a User
   * const user = await prisma.user.upsert({
   *   create: {
   *     // ... data to create a User
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the User we want to update
   *   }
   * })
  **/
  upsert<T extends UserUpsertArgs>(
    args: Subset<T, UserUpsertArgs>
  ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManyUserArgs, 'select' | 'include'>): Promise<number>


}

/**
 * The delegate class that acts as a "Promise-like" for User.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__UserClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  courses<T extends FindManyCourseEnrollmentArgs = {}>(args?: Subset<T, FindManyCourseEnrollmentArgs>): CheckSelect<T, Promise<Array<CourseEnrollment>>, Promise<Array<CourseEnrollmentGetPayload<T>>>>;

  testResults<T extends FindManyTestResultArgs = {}>(args?: Subset<T, FindManyTestResultArgs>): CheckSelect<T, Promise<Array<TestResult>>, Promise<Array<TestResultGetPayload<T>>>>;

  testGraded<T extends FindManyTestResultArgs = {}>(args?: Subset<T, FindManyTestResultArgs>): CheckSelect<T, Promise<Array<TestResult>>, Promise<Array<TestResultGetPayload<T>>>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * User findOne
 */
export type FindOneUserArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
  /**
   * Filter, which User to fetch.
  **/
  where: UserWhereUniqueInput
}


/**
 * User findMany
 */
export type FindManyUserArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
  /**
   * Filter, which Users to fetch.
  **/
  where?: UserWhereInput
  /**
   * Determine the order of the Users to fetch.
  **/
  orderBy?: UserOrderByInput
  /**
   * Sets the position for listing Users.
  **/
  cursor?: UserWhereUniqueInput
  /**
   * The number of Users to fetch. If negative number, it will take Users before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` Users.
  **/
  skip?: number
}


/**
 * User create
 */
export type UserCreateArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
  /**
   * The data needed to create a User.
  **/
  data: UserCreateInput
}


/**
 * User update
 */
export type UserUpdateArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
  /**
   * The data needed to update a User.
  **/
  data: UserUpdateInput
  /**
   * Choose, which User to update.
  **/
  where: UserWhereUniqueInput
}


/**
 * User updateMany
 */
export type UserUpdateManyArgs = {
  data: UserUpdateManyMutationInput
  where?: UserWhereInput
}


/**
 * User upsert
 */
export type UserUpsertArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
  /**
   * The filter to search for the User to update in case it exists.
  **/
  where: UserWhereUniqueInput
  /**
   * In case the User found by the `where` argument doesn't exist, create a new User with this data.
  **/
  create: UserCreateInput
  /**
   * In case the User was found with the provided `where` argument, update it with this data.
  **/
  update: UserUpdateInput
}


/**
 * User delete
 */
export type UserDeleteArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
  /**
   * Filter which User to delete.
  **/
  where: UserWhereUniqueInput
}


/**
 * User deleteMany
 */
export type UserDeleteManyArgs = {
  where?: UserWhereInput
}


/**
 * User without action
 */
export type UserArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
}



/**
 * Model Course
 */

export type Course = {
  id: number
  name: string
  courseDetails: string
}



export type CourseSelect = {
  id?: boolean
  name?: boolean
  courseDetails?: boolean
  members?: boolean | FindManyCourseEnrollmentArgs
  tests?: boolean | FindManyTestArgs
}

export type CourseInclude = {
  members?: boolean | FindManyCourseEnrollmentArgs
  tests?: boolean | FindManyTestArgs
}

export type CourseGetPayload<
  S extends boolean | null | undefined | CourseArgs,
  U = keyof S
> = S extends true
  ? Course
  : S extends undefined
  ? never
  : S extends CourseArgs | FindManyCourseArgs
  ? 'include' extends U
    ? Course  & {
      [P in TrueKeys<S['include']>]:
      P extends 'members'
      ? Array<CourseEnrollmentGetPayload<S['include'][P]>> :
      P extends 'tests'
      ? Array<TestGetPayload<S['include'][P]>> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof Course ? Course[P]
: 
      P extends 'members'
      ? Array<CourseEnrollmentGetPayload<S['select'][P]>> :
      P extends 'tests'
      ? Array<TestGetPayload<S['select'][P]>> : never
    }
  : Course
: Course


export interface CourseDelegate {
  /**
   * Find zero or one Course.
   * @param {FindOneCourseArgs} args - Arguments to find a Course
   * @example
   * // Get one Course
   * const course = await prisma.course.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneCourseArgs>(
    args: Subset<T, FindOneCourseArgs>
  ): CheckSelect<T, Prisma__CourseClient<Course | null>, Prisma__CourseClient<CourseGetPayload<T> | null>>
  /**
   * Find zero or more Courses.
   * @param {FindManyCourseArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Courses
   * const courses = await prisma.course.findMany()
   * 
   * // Get first 10 Courses
   * const courses = await prisma.course.findMany({ take: 10 })
   * 
   * // Only select the `id`
   * const courseWithIdOnly = await prisma.course.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManyCourseArgs>(
    args?: Subset<T, FindManyCourseArgs>
  ): CheckSelect<T, Promise<Array<Course>>, Promise<Array<CourseGetPayload<T>>>>
  /**
   * Create a Course.
   * @param {CourseCreateArgs} args - Arguments to create a Course.
   * @example
   * // Create one Course
   * const Course = await prisma.course.create({
   *   data: {
   *     // ... data to create a Course
   *   }
   * })
   * 
  **/
  create<T extends CourseCreateArgs>(
    args: Subset<T, CourseCreateArgs>
  ): CheckSelect<T, Prisma__CourseClient<Course>, Prisma__CourseClient<CourseGetPayload<T>>>
  /**
   * Delete a Course.
   * @param {CourseDeleteArgs} args - Arguments to delete one Course.
   * @example
   * // Delete one Course
   * const Course = await prisma.course.delete({
   *   where: {
   *     // ... filter to delete one Course
   *   }
   * })
   * 
  **/
  delete<T extends CourseDeleteArgs>(
    args: Subset<T, CourseDeleteArgs>
  ): CheckSelect<T, Prisma__CourseClient<Course>, Prisma__CourseClient<CourseGetPayload<T>>>
  /**
   * Update one Course.
   * @param {CourseUpdateArgs} args - Arguments to update one Course.
   * @example
   * // Update one Course
   * const course = await prisma.course.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends CourseUpdateArgs>(
    args: Subset<T, CourseUpdateArgs>
  ): CheckSelect<T, Prisma__CourseClient<Course>, Prisma__CourseClient<CourseGetPayload<T>>>
  /**
   * Delete zero or more Courses.
   * @param {CourseDeleteManyArgs} args - Arguments to filter Courses to delete.
   * @example
   * // Delete a few Courses
   * const { count } = await prisma.course.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends CourseDeleteManyArgs>(
    args: Subset<T, CourseDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Courses.
   * @param {CourseUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Courses
   * const course = await prisma.course.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends CourseUpdateManyArgs>(
    args: Subset<T, CourseUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Course.
   * @param {CourseUpsertArgs} args - Arguments to update or create a Course.
   * @example
   * // Update or create a Course
   * const course = await prisma.course.upsert({
   *   create: {
   *     // ... data to create a Course
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Course we want to update
   *   }
   * })
  **/
  upsert<T extends CourseUpsertArgs>(
    args: Subset<T, CourseUpsertArgs>
  ): CheckSelect<T, Prisma__CourseClient<Course>, Prisma__CourseClient<CourseGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManyCourseArgs, 'select' | 'include'>): Promise<number>


}

/**
 * The delegate class that acts as a "Promise-like" for Course.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__CourseClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  members<T extends FindManyCourseEnrollmentArgs = {}>(args?: Subset<T, FindManyCourseEnrollmentArgs>): CheckSelect<T, Promise<Array<CourseEnrollment>>, Promise<Array<CourseEnrollmentGetPayload<T>>>>;

  tests<T extends FindManyTestArgs = {}>(args?: Subset<T, FindManyTestArgs>): CheckSelect<T, Promise<Array<Test>>, Promise<Array<TestGetPayload<T>>>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * Course findOne
 */
export type FindOneCourseArgs = {
  /**
   * Select specific fields to fetch from the Course
  **/
  select?: CourseSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: CourseInclude | null
  /**
   * Filter, which Course to fetch.
  **/
  where: CourseWhereUniqueInput
}


/**
 * Course findMany
 */
export type FindManyCourseArgs = {
  /**
   * Select specific fields to fetch from the Course
  **/
  select?: CourseSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: CourseInclude | null
  /**
   * Filter, which Courses to fetch.
  **/
  where?: CourseWhereInput
  /**
   * Determine the order of the Courses to fetch.
  **/
  orderBy?: CourseOrderByInput
  /**
   * Sets the position for listing Courses.
  **/
  cursor?: CourseWhereUniqueInput
  /**
   * The number of Courses to fetch. If negative number, it will take Courses before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` Courses.
  **/
  skip?: number
}


/**
 * Course create
 */
export type CourseCreateArgs = {
  /**
   * Select specific fields to fetch from the Course
  **/
  select?: CourseSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: CourseInclude | null
  /**
   * The data needed to create a Course.
  **/
  data: CourseCreateInput
}


/**
 * Course update
 */
export type CourseUpdateArgs = {
  /**
   * Select specific fields to fetch from the Course
  **/
  select?: CourseSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: CourseInclude | null
  /**
   * The data needed to update a Course.
  **/
  data: CourseUpdateInput
  /**
   * Choose, which Course to update.
  **/
  where: CourseWhereUniqueInput
}


/**
 * Course updateMany
 */
export type CourseUpdateManyArgs = {
  data: CourseUpdateManyMutationInput
  where?: CourseWhereInput
}


/**
 * Course upsert
 */
export type CourseUpsertArgs = {
  /**
   * Select specific fields to fetch from the Course
  **/
  select?: CourseSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: CourseInclude | null
  /**
   * The filter to search for the Course to update in case it exists.
  **/
  where: CourseWhereUniqueInput
  /**
   * In case the Course found by the `where` argument doesn't exist, create a new Course with this data.
  **/
  create: CourseCreateInput
  /**
   * In case the Course was found with the provided `where` argument, update it with this data.
  **/
  update: CourseUpdateInput
}


/**
 * Course delete
 */
export type CourseDeleteArgs = {
  /**
   * Select specific fields to fetch from the Course
  **/
  select?: CourseSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: CourseInclude | null
  /**
   * Filter which Course to delete.
  **/
  where: CourseWhereUniqueInput
}


/**
 * Course deleteMany
 */
export type CourseDeleteManyArgs = {
  where?: CourseWhereInput
}


/**
 * Course without action
 */
export type CourseArgs = {
  /**
   * Select specific fields to fetch from the Course
  **/
  select?: CourseSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: CourseInclude | null
}



/**
 * Model CourseEnrollment
 */

export type CourseEnrollment = {
  createdAt: Date
  role: UserRole
  userId: number
  courseId: number
}



export type CourseEnrollmentSelect = {
  createdAt?: boolean
  role?: boolean
  userId?: boolean
  courseId?: boolean
  user?: boolean | UserArgs
  course?: boolean | CourseArgs
}

export type CourseEnrollmentInclude = {
  user?: boolean | UserArgs
  course?: boolean | CourseArgs
}

export type CourseEnrollmentGetPayload<
  S extends boolean | null | undefined | CourseEnrollmentArgs,
  U = keyof S
> = S extends true
  ? CourseEnrollment
  : S extends undefined
  ? never
  : S extends CourseEnrollmentArgs | FindManyCourseEnrollmentArgs
  ? 'include' extends U
    ? CourseEnrollment  & {
      [P in TrueKeys<S['include']>]:
      P extends 'user'
      ? UserGetPayload<S['include'][P]> :
      P extends 'course'
      ? CourseGetPayload<S['include'][P]> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof CourseEnrollment ? CourseEnrollment[P]
: 
      P extends 'user'
      ? UserGetPayload<S['select'][P]> :
      P extends 'course'
      ? CourseGetPayload<S['select'][P]> : never
    }
  : CourseEnrollment
: CourseEnrollment


export interface CourseEnrollmentDelegate {
  /**
   * Find zero or one CourseEnrollment.
   * @param {FindOneCourseEnrollmentArgs} args - Arguments to find a CourseEnrollment
   * @example
   * // Get one CourseEnrollment
   * const courseEnrollment = await prisma.courseEnrollment.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneCourseEnrollmentArgs>(
    args: Subset<T, FindOneCourseEnrollmentArgs>
  ): CheckSelect<T, Prisma__CourseEnrollmentClient<CourseEnrollment | null>, Prisma__CourseEnrollmentClient<CourseEnrollmentGetPayload<T> | null>>
  /**
   * Find zero or more CourseEnrollments.
   * @param {FindManyCourseEnrollmentArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all CourseEnrollments
   * const courseEnrollments = await prisma.courseEnrollment.findMany()
   * 
   * // Get first 10 CourseEnrollments
   * const courseEnrollments = await prisma.courseEnrollment.findMany({ take: 10 })
   * 
   * // Only select the `createdAt`
   * const courseEnrollmentWithCreatedAtOnly = await prisma.courseEnrollment.findMany({ select: { createdAt: true } })
   * 
  **/
  findMany<T extends FindManyCourseEnrollmentArgs>(
    args?: Subset<T, FindManyCourseEnrollmentArgs>
  ): CheckSelect<T, Promise<Array<CourseEnrollment>>, Promise<Array<CourseEnrollmentGetPayload<T>>>>
  /**
   * Create a CourseEnrollment.
   * @param {CourseEnrollmentCreateArgs} args - Arguments to create a CourseEnrollment.
   * @example
   * // Create one CourseEnrollment
   * const CourseEnrollment = await prisma.courseEnrollment.create({
   *   data: {
   *     // ... data to create a CourseEnrollment
   *   }
   * })
   * 
  **/
  create<T extends CourseEnrollmentCreateArgs>(
    args: Subset<T, CourseEnrollmentCreateArgs>
  ): CheckSelect<T, Prisma__CourseEnrollmentClient<CourseEnrollment>, Prisma__CourseEnrollmentClient<CourseEnrollmentGetPayload<T>>>
  /**
   * Delete a CourseEnrollment.
   * @param {CourseEnrollmentDeleteArgs} args - Arguments to delete one CourseEnrollment.
   * @example
   * // Delete one CourseEnrollment
   * const CourseEnrollment = await prisma.courseEnrollment.delete({
   *   where: {
   *     // ... filter to delete one CourseEnrollment
   *   }
   * })
   * 
  **/
  delete<T extends CourseEnrollmentDeleteArgs>(
    args: Subset<T, CourseEnrollmentDeleteArgs>
  ): CheckSelect<T, Prisma__CourseEnrollmentClient<CourseEnrollment>, Prisma__CourseEnrollmentClient<CourseEnrollmentGetPayload<T>>>
  /**
   * Update one CourseEnrollment.
   * @param {CourseEnrollmentUpdateArgs} args - Arguments to update one CourseEnrollment.
   * @example
   * // Update one CourseEnrollment
   * const courseEnrollment = await prisma.courseEnrollment.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends CourseEnrollmentUpdateArgs>(
    args: Subset<T, CourseEnrollmentUpdateArgs>
  ): CheckSelect<T, Prisma__CourseEnrollmentClient<CourseEnrollment>, Prisma__CourseEnrollmentClient<CourseEnrollmentGetPayload<T>>>
  /**
   * Delete zero or more CourseEnrollments.
   * @param {CourseEnrollmentDeleteManyArgs} args - Arguments to filter CourseEnrollments to delete.
   * @example
   * // Delete a few CourseEnrollments
   * const { count } = await prisma.courseEnrollment.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends CourseEnrollmentDeleteManyArgs>(
    args: Subset<T, CourseEnrollmentDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more CourseEnrollments.
   * @param {CourseEnrollmentUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many CourseEnrollments
   * const courseEnrollment = await prisma.courseEnrollment.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends CourseEnrollmentUpdateManyArgs>(
    args: Subset<T, CourseEnrollmentUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one CourseEnrollment.
   * @param {CourseEnrollmentUpsertArgs} args - Arguments to update or create a CourseEnrollment.
   * @example
   * // Update or create a CourseEnrollment
   * const courseEnrollment = await prisma.courseEnrollment.upsert({
   *   create: {
   *     // ... data to create a CourseEnrollment
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the CourseEnrollment we want to update
   *   }
   * })
  **/
  upsert<T extends CourseEnrollmentUpsertArgs>(
    args: Subset<T, CourseEnrollmentUpsertArgs>
  ): CheckSelect<T, Prisma__CourseEnrollmentClient<CourseEnrollment>, Prisma__CourseEnrollmentClient<CourseEnrollmentGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManyCourseEnrollmentArgs, 'select' | 'include'>): Promise<number>


}

/**
 * The delegate class that acts as a "Promise-like" for CourseEnrollment.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__CourseEnrollmentClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  user<T extends UserArgs = {}>(args?: Subset<T, UserArgs>): CheckSelect<T, Prisma__UserClient<User | null>, Prisma__UserClient<UserGetPayload<T> | null>>;

  course<T extends CourseArgs = {}>(args?: Subset<T, CourseArgs>): CheckSelect<T, Prisma__CourseClient<Course | null>, Prisma__CourseClient<CourseGetPayload<T> | null>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * CourseEnrollment findOne
 */
export type FindOneCourseEnrollmentArgs = {
  /**
   * Select specific fields to fetch from the CourseEnrollment
  **/
  select?: CourseEnrollmentSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: CourseEnrollmentInclude | null
  /**
   * Filter, which CourseEnrollment to fetch.
  **/
  where: CourseEnrollmentWhereUniqueInput
}


/**
 * CourseEnrollment findMany
 */
export type FindManyCourseEnrollmentArgs = {
  /**
   * Select specific fields to fetch from the CourseEnrollment
  **/
  select?: CourseEnrollmentSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: CourseEnrollmentInclude | null
  /**
   * Filter, which CourseEnrollments to fetch.
  **/
  where?: CourseEnrollmentWhereInput
  /**
   * Determine the order of the CourseEnrollments to fetch.
  **/
  orderBy?: CourseEnrollmentOrderByInput
  /**
   * Sets the position for listing CourseEnrollments.
  **/
  cursor?: CourseEnrollmentWhereUniqueInput
  /**
   * The number of CourseEnrollments to fetch. If negative number, it will take CourseEnrollments before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` CourseEnrollments.
  **/
  skip?: number
}


/**
 * CourseEnrollment create
 */
export type CourseEnrollmentCreateArgs = {
  /**
   * Select specific fields to fetch from the CourseEnrollment
  **/
  select?: CourseEnrollmentSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: CourseEnrollmentInclude | null
  /**
   * The data needed to create a CourseEnrollment.
  **/
  data: CourseEnrollmentCreateInput
}


/**
 * CourseEnrollment update
 */
export type CourseEnrollmentUpdateArgs = {
  /**
   * Select specific fields to fetch from the CourseEnrollment
  **/
  select?: CourseEnrollmentSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: CourseEnrollmentInclude | null
  /**
   * The data needed to update a CourseEnrollment.
  **/
  data: CourseEnrollmentUpdateInput
  /**
   * Choose, which CourseEnrollment to update.
  **/
  where: CourseEnrollmentWhereUniqueInput
}


/**
 * CourseEnrollment updateMany
 */
export type CourseEnrollmentUpdateManyArgs = {
  data: CourseEnrollmentUpdateManyMutationInput
  where?: CourseEnrollmentWhereInput
}


/**
 * CourseEnrollment upsert
 */
export type CourseEnrollmentUpsertArgs = {
  /**
   * Select specific fields to fetch from the CourseEnrollment
  **/
  select?: CourseEnrollmentSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: CourseEnrollmentInclude | null
  /**
   * The filter to search for the CourseEnrollment to update in case it exists.
  **/
  where: CourseEnrollmentWhereUniqueInput
  /**
   * In case the CourseEnrollment found by the `where` argument doesn't exist, create a new CourseEnrollment with this data.
  **/
  create: CourseEnrollmentCreateInput
  /**
   * In case the CourseEnrollment was found with the provided `where` argument, update it with this data.
  **/
  update: CourseEnrollmentUpdateInput
}


/**
 * CourseEnrollment delete
 */
export type CourseEnrollmentDeleteArgs = {
  /**
   * Select specific fields to fetch from the CourseEnrollment
  **/
  select?: CourseEnrollmentSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: CourseEnrollmentInclude | null
  /**
   * Filter which CourseEnrollment to delete.
  **/
  where: CourseEnrollmentWhereUniqueInput
}


/**
 * CourseEnrollment deleteMany
 */
export type CourseEnrollmentDeleteManyArgs = {
  where?: CourseEnrollmentWhereInput
}


/**
 * CourseEnrollment without action
 */
export type CourseEnrollmentArgs = {
  /**
   * Select specific fields to fetch from the CourseEnrollment
  **/
  select?: CourseEnrollmentSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: CourseEnrollmentInclude | null
}



/**
 * Model Test
 */

export type Test = {
  id: number
  updatedAt: Date
  name: string
  date: Date
  courseId: number
}



export type TestSelect = {
  id?: boolean
  updatedAt?: boolean
  name?: boolean
  date?: boolean
  courseId?: boolean
  course?: boolean | CourseArgs
  testResults?: boolean | FindManyTestResultArgs
}

export type TestInclude = {
  course?: boolean | CourseArgs
  testResults?: boolean | FindManyTestResultArgs
}

export type TestGetPayload<
  S extends boolean | null | undefined | TestArgs,
  U = keyof S
> = S extends true
  ? Test
  : S extends undefined
  ? never
  : S extends TestArgs | FindManyTestArgs
  ? 'include' extends U
    ? Test  & {
      [P in TrueKeys<S['include']>]:
      P extends 'course'
      ? CourseGetPayload<S['include'][P]> :
      P extends 'testResults'
      ? Array<TestResultGetPayload<S['include'][P]>> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof Test ? Test[P]
: 
      P extends 'course'
      ? CourseGetPayload<S['select'][P]> :
      P extends 'testResults'
      ? Array<TestResultGetPayload<S['select'][P]>> : never
    }
  : Test
: Test


export interface TestDelegate {
  /**
   * Find zero or one Test.
   * @param {FindOneTestArgs} args - Arguments to find a Test
   * @example
   * // Get one Test
   * const test = await prisma.test.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneTestArgs>(
    args: Subset<T, FindOneTestArgs>
  ): CheckSelect<T, Prisma__TestClient<Test | null>, Prisma__TestClient<TestGetPayload<T> | null>>
  /**
   * Find zero or more Tests.
   * @param {FindManyTestArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Tests
   * const tests = await prisma.test.findMany()
   * 
   * // Get first 10 Tests
   * const tests = await prisma.test.findMany({ take: 10 })
   * 
   * // Only select the `id`
   * const testWithIdOnly = await prisma.test.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManyTestArgs>(
    args?: Subset<T, FindManyTestArgs>
  ): CheckSelect<T, Promise<Array<Test>>, Promise<Array<TestGetPayload<T>>>>
  /**
   * Create a Test.
   * @param {TestCreateArgs} args - Arguments to create a Test.
   * @example
   * // Create one Test
   * const Test = await prisma.test.create({
   *   data: {
   *     // ... data to create a Test
   *   }
   * })
   * 
  **/
  create<T extends TestCreateArgs>(
    args: Subset<T, TestCreateArgs>
  ): CheckSelect<T, Prisma__TestClient<Test>, Prisma__TestClient<TestGetPayload<T>>>
  /**
   * Delete a Test.
   * @param {TestDeleteArgs} args - Arguments to delete one Test.
   * @example
   * // Delete one Test
   * const Test = await prisma.test.delete({
   *   where: {
   *     // ... filter to delete one Test
   *   }
   * })
   * 
  **/
  delete<T extends TestDeleteArgs>(
    args: Subset<T, TestDeleteArgs>
  ): CheckSelect<T, Prisma__TestClient<Test>, Prisma__TestClient<TestGetPayload<T>>>
  /**
   * Update one Test.
   * @param {TestUpdateArgs} args - Arguments to update one Test.
   * @example
   * // Update one Test
   * const test = await prisma.test.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends TestUpdateArgs>(
    args: Subset<T, TestUpdateArgs>
  ): CheckSelect<T, Prisma__TestClient<Test>, Prisma__TestClient<TestGetPayload<T>>>
  /**
   * Delete zero or more Tests.
   * @param {TestDeleteManyArgs} args - Arguments to filter Tests to delete.
   * @example
   * // Delete a few Tests
   * const { count } = await prisma.test.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends TestDeleteManyArgs>(
    args: Subset<T, TestDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Tests.
   * @param {TestUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Tests
   * const test = await prisma.test.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends TestUpdateManyArgs>(
    args: Subset<T, TestUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Test.
   * @param {TestUpsertArgs} args - Arguments to update or create a Test.
   * @example
   * // Update or create a Test
   * const test = await prisma.test.upsert({
   *   create: {
   *     // ... data to create a Test
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Test we want to update
   *   }
   * })
  **/
  upsert<T extends TestUpsertArgs>(
    args: Subset<T, TestUpsertArgs>
  ): CheckSelect<T, Prisma__TestClient<Test>, Prisma__TestClient<TestGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManyTestArgs, 'select' | 'include'>): Promise<number>


}

/**
 * The delegate class that acts as a "Promise-like" for Test.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__TestClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  course<T extends CourseArgs = {}>(args?: Subset<T, CourseArgs>): CheckSelect<T, Prisma__CourseClient<Course | null>, Prisma__CourseClient<CourseGetPayload<T> | null>>;

  testResults<T extends FindManyTestResultArgs = {}>(args?: Subset<T, FindManyTestResultArgs>): CheckSelect<T, Promise<Array<TestResult>>, Promise<Array<TestResultGetPayload<T>>>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * Test findOne
 */
export type FindOneTestArgs = {
  /**
   * Select specific fields to fetch from the Test
  **/
  select?: TestSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: TestInclude | null
  /**
   * Filter, which Test to fetch.
  **/
  where: TestWhereUniqueInput
}


/**
 * Test findMany
 */
export type FindManyTestArgs = {
  /**
   * Select specific fields to fetch from the Test
  **/
  select?: TestSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: TestInclude | null
  /**
   * Filter, which Tests to fetch.
  **/
  where?: TestWhereInput
  /**
   * Determine the order of the Tests to fetch.
  **/
  orderBy?: TestOrderByInput
  /**
   * Sets the position for listing Tests.
  **/
  cursor?: TestWhereUniqueInput
  /**
   * The number of Tests to fetch. If negative number, it will take Tests before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` Tests.
  **/
  skip?: number
}


/**
 * Test create
 */
export type TestCreateArgs = {
  /**
   * Select specific fields to fetch from the Test
  **/
  select?: TestSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: TestInclude | null
  /**
   * The data needed to create a Test.
  **/
  data: TestCreateInput
}


/**
 * Test update
 */
export type TestUpdateArgs = {
  /**
   * Select specific fields to fetch from the Test
  **/
  select?: TestSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: TestInclude | null
  /**
   * The data needed to update a Test.
  **/
  data: TestUpdateInput
  /**
   * Choose, which Test to update.
  **/
  where: TestWhereUniqueInput
}


/**
 * Test updateMany
 */
export type TestUpdateManyArgs = {
  data: TestUpdateManyMutationInput
  where?: TestWhereInput
}


/**
 * Test upsert
 */
export type TestUpsertArgs = {
  /**
   * Select specific fields to fetch from the Test
  **/
  select?: TestSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: TestInclude | null
  /**
   * The filter to search for the Test to update in case it exists.
  **/
  where: TestWhereUniqueInput
  /**
   * In case the Test found by the `where` argument doesn't exist, create a new Test with this data.
  **/
  create: TestCreateInput
  /**
   * In case the Test was found with the provided `where` argument, update it with this data.
  **/
  update: TestUpdateInput
}


/**
 * Test delete
 */
export type TestDeleteArgs = {
  /**
   * Select specific fields to fetch from the Test
  **/
  select?: TestSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: TestInclude | null
  /**
   * Filter which Test to delete.
  **/
  where: TestWhereUniqueInput
}


/**
 * Test deleteMany
 */
export type TestDeleteManyArgs = {
  where?: TestWhereInput
}


/**
 * Test without action
 */
export type TestArgs = {
  /**
   * Select specific fields to fetch from the Test
  **/
  select?: TestSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: TestInclude | null
}



/**
 * Model TestResult
 */

export type TestResult = {
  id: number
  createdAt: Date
  result: number
  testId: number
  studentId: number
  graderId: number
}



export type TestResultSelect = {
  id?: boolean
  createdAt?: boolean
  result?: boolean
  testId?: boolean
  test?: boolean | TestArgs
  studentId?: boolean
  student?: boolean | UserArgs
  graderId?: boolean
  gradedBy?: boolean | UserArgs
}

export type TestResultInclude = {
  test?: boolean | TestArgs
  student?: boolean | UserArgs
  gradedBy?: boolean | UserArgs
}

export type TestResultGetPayload<
  S extends boolean | null | undefined | TestResultArgs,
  U = keyof S
> = S extends true
  ? TestResult
  : S extends undefined
  ? never
  : S extends TestResultArgs | FindManyTestResultArgs
  ? 'include' extends U
    ? TestResult  & {
      [P in TrueKeys<S['include']>]:
      P extends 'test'
      ? TestGetPayload<S['include'][P]> :
      P extends 'student'
      ? UserGetPayload<S['include'][P]> :
      P extends 'gradedBy'
      ? UserGetPayload<S['include'][P]> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof TestResult ? TestResult[P]
: 
      P extends 'test'
      ? TestGetPayload<S['select'][P]> :
      P extends 'student'
      ? UserGetPayload<S['select'][P]> :
      P extends 'gradedBy'
      ? UserGetPayload<S['select'][P]> : never
    }
  : TestResult
: TestResult


export interface TestResultDelegate {
  /**
   * Find zero or one TestResult.
   * @param {FindOneTestResultArgs} args - Arguments to find a TestResult
   * @example
   * // Get one TestResult
   * const testResult = await prisma.testResult.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneTestResultArgs>(
    args: Subset<T, FindOneTestResultArgs>
  ): CheckSelect<T, Prisma__TestResultClient<TestResult | null>, Prisma__TestResultClient<TestResultGetPayload<T> | null>>
  /**
   * Find zero or more TestResults.
   * @param {FindManyTestResultArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all TestResults
   * const testResults = await prisma.testResult.findMany()
   * 
   * // Get first 10 TestResults
   * const testResults = await prisma.testResult.findMany({ take: 10 })
   * 
   * // Only select the `id`
   * const testResultWithIdOnly = await prisma.testResult.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManyTestResultArgs>(
    args?: Subset<T, FindManyTestResultArgs>
  ): CheckSelect<T, Promise<Array<TestResult>>, Promise<Array<TestResultGetPayload<T>>>>
  /**
   * Create a TestResult.
   * @param {TestResultCreateArgs} args - Arguments to create a TestResult.
   * @example
   * // Create one TestResult
   * const TestResult = await prisma.testResult.create({
   *   data: {
   *     // ... data to create a TestResult
   *   }
   * })
   * 
  **/
  create<T extends TestResultCreateArgs>(
    args: Subset<T, TestResultCreateArgs>
  ): CheckSelect<T, Prisma__TestResultClient<TestResult>, Prisma__TestResultClient<TestResultGetPayload<T>>>
  /**
   * Delete a TestResult.
   * @param {TestResultDeleteArgs} args - Arguments to delete one TestResult.
   * @example
   * // Delete one TestResult
   * const TestResult = await prisma.testResult.delete({
   *   where: {
   *     // ... filter to delete one TestResult
   *   }
   * })
   * 
  **/
  delete<T extends TestResultDeleteArgs>(
    args: Subset<T, TestResultDeleteArgs>
  ): CheckSelect<T, Prisma__TestResultClient<TestResult>, Prisma__TestResultClient<TestResultGetPayload<T>>>
  /**
   * Update one TestResult.
   * @param {TestResultUpdateArgs} args - Arguments to update one TestResult.
   * @example
   * // Update one TestResult
   * const testResult = await prisma.testResult.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends TestResultUpdateArgs>(
    args: Subset<T, TestResultUpdateArgs>
  ): CheckSelect<T, Prisma__TestResultClient<TestResult>, Prisma__TestResultClient<TestResultGetPayload<T>>>
  /**
   * Delete zero or more TestResults.
   * @param {TestResultDeleteManyArgs} args - Arguments to filter TestResults to delete.
   * @example
   * // Delete a few TestResults
   * const { count } = await prisma.testResult.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends TestResultDeleteManyArgs>(
    args: Subset<T, TestResultDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more TestResults.
   * @param {TestResultUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many TestResults
   * const testResult = await prisma.testResult.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends TestResultUpdateManyArgs>(
    args: Subset<T, TestResultUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one TestResult.
   * @param {TestResultUpsertArgs} args - Arguments to update or create a TestResult.
   * @example
   * // Update or create a TestResult
   * const testResult = await prisma.testResult.upsert({
   *   create: {
   *     // ... data to create a TestResult
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the TestResult we want to update
   *   }
   * })
  **/
  upsert<T extends TestResultUpsertArgs>(
    args: Subset<T, TestResultUpsertArgs>
  ): CheckSelect<T, Prisma__TestResultClient<TestResult>, Prisma__TestResultClient<TestResultGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManyTestResultArgs, 'select' | 'include'>): Promise<number>


}

/**
 * The delegate class that acts as a "Promise-like" for TestResult.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__TestResultClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  test<T extends TestArgs = {}>(args?: Subset<T, TestArgs>): CheckSelect<T, Prisma__TestClient<Test | null>, Prisma__TestClient<TestGetPayload<T> | null>>;

  student<T extends UserArgs = {}>(args?: Subset<T, UserArgs>): CheckSelect<T, Prisma__UserClient<User | null>, Prisma__UserClient<UserGetPayload<T> | null>>;

  gradedBy<T extends UserArgs = {}>(args?: Subset<T, UserArgs>): CheckSelect<T, Prisma__UserClient<User | null>, Prisma__UserClient<UserGetPayload<T> | null>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * TestResult findOne
 */
export type FindOneTestResultArgs = {
  /**
   * Select specific fields to fetch from the TestResult
  **/
  select?: TestResultSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: TestResultInclude | null
  /**
   * Filter, which TestResult to fetch.
  **/
  where: TestResultWhereUniqueInput
}


/**
 * TestResult findMany
 */
export type FindManyTestResultArgs = {
  /**
   * Select specific fields to fetch from the TestResult
  **/
  select?: TestResultSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: TestResultInclude | null
  /**
   * Filter, which TestResults to fetch.
  **/
  where?: TestResultWhereInput
  /**
   * Determine the order of the TestResults to fetch.
  **/
  orderBy?: TestResultOrderByInput
  /**
   * Sets the position for listing TestResults.
  **/
  cursor?: TestResultWhereUniqueInput
  /**
   * The number of TestResults to fetch. If negative number, it will take TestResults before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` TestResults.
  **/
  skip?: number
}


/**
 * TestResult create
 */
export type TestResultCreateArgs = {
  /**
   * Select specific fields to fetch from the TestResult
  **/
  select?: TestResultSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: TestResultInclude | null
  /**
   * The data needed to create a TestResult.
  **/
  data: TestResultCreateInput
}


/**
 * TestResult update
 */
export type TestResultUpdateArgs = {
  /**
   * Select specific fields to fetch from the TestResult
  **/
  select?: TestResultSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: TestResultInclude | null
  /**
   * The data needed to update a TestResult.
  **/
  data: TestResultUpdateInput
  /**
   * Choose, which TestResult to update.
  **/
  where: TestResultWhereUniqueInput
}


/**
 * TestResult updateMany
 */
export type TestResultUpdateManyArgs = {
  data: TestResultUpdateManyMutationInput
  where?: TestResultWhereInput
}


/**
 * TestResult upsert
 */
export type TestResultUpsertArgs = {
  /**
   * Select specific fields to fetch from the TestResult
  **/
  select?: TestResultSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: TestResultInclude | null
  /**
   * The filter to search for the TestResult to update in case it exists.
  **/
  where: TestResultWhereUniqueInput
  /**
   * In case the TestResult found by the `where` argument doesn't exist, create a new TestResult with this data.
  **/
  create: TestResultCreateInput
  /**
   * In case the TestResult was found with the provided `where` argument, update it with this data.
  **/
  update: TestResultUpdateInput
}


/**
 * TestResult delete
 */
export type TestResultDeleteArgs = {
  /**
   * Select specific fields to fetch from the TestResult
  **/
  select?: TestResultSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: TestResultInclude | null
  /**
   * Filter which TestResult to delete.
  **/
  where: TestResultWhereUniqueInput
}


/**
 * TestResult deleteMany
 */
export type TestResultDeleteManyArgs = {
  where?: TestResultWhereInput
}


/**
 * TestResult without action
 */
export type TestResultArgs = {
  /**
   * Select specific fields to fetch from the TestResult
  **/
  select?: TestResultSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: TestResultInclude | null
}



/**
 * Deep Input Types
 */


export type TestResultWhereInput = {
  id?: number | IntFilter
  createdAt?: Date | string | DateTimeFilter
  result?: number | IntFilter
  testId?: number | IntFilter
  studentId?: number | IntFilter
  graderId?: number | IntFilter
  AND?: Enumerable<TestResultWhereInput>
  OR?: Array<TestResultWhereInput>
  NOT?: Enumerable<TestResultWhereInput>
  test?: TestWhereInput | null
  student?: UserWhereInput | null
  gradedBy?: UserWhereInput | null
}

export type TestWhereInput = {
  id?: number | IntFilter
  updatedAt?: Date | string | DateTimeFilter
  name?: string | StringFilter
  date?: Date | string | DateTimeFilter
  courseId?: number | IntFilter
  testResults?: TestResultFilter | null
  AND?: Enumerable<TestWhereInput>
  OR?: Array<TestWhereInput>
  NOT?: Enumerable<TestWhereInput>
  course?: CourseWhereInput | null
}

export type CourseWhereInput = {
  id?: number | IntFilter
  name?: string | StringFilter
  courseDetails?: string | StringFilter
  members?: CourseEnrollmentFilter | null
  tests?: TestFilter | null
  AND?: Enumerable<CourseWhereInput>
  OR?: Array<CourseWhereInput>
  NOT?: Enumerable<CourseWhereInput>
}

export type CourseEnrollmentWhereInput = {
  createdAt?: Date | string | DateTimeFilter
  role?: UserRole | UserRoleFilter
  userId?: number | IntFilter
  courseId?: number | IntFilter
  AND?: Enumerable<CourseEnrollmentWhereInput>
  OR?: Array<CourseEnrollmentWhereInput>
  NOT?: Enumerable<CourseEnrollmentWhereInput>
  user?: UserWhereInput | null
  course?: CourseWhereInput | null
}

export type UserWhereInput = {
  id?: number | IntFilter
  email?: string | StringFilter
  firstName?: string | StringFilter
  lastName?: string | StringFilter
  social?: InputJsonValue | JsonFilter
  courses?: CourseEnrollmentFilter | null
  testResults?: TestResultFilter | null
  testGraded?: TestResultFilter | null
  AND?: Enumerable<UserWhereInput>
  OR?: Array<UserWhereInput>
  NOT?: Enumerable<UserWhereInput>
}

export type UserWhereUniqueInput = {
  id?: number
  email?: string
}

export type UserIdCourseIdRoleCompoundUniqueInput = {
  userId: number
  courseId: number
  role: UserRole
}

export type CourseEnrollmentWhereUniqueInput = {
  userId_courseId_role?: UserIdCourseIdRoleCompoundUniqueInput
}

export type TestWhereUniqueInput = {
  id?: number
}

export type TestResultWhereUniqueInput = {
  id?: number
}

export type CourseWhereUniqueInput = {
  id?: number
}

export type UserCreateWithoutTestGradedInput = {
  email: string
  firstName: string
  lastName: string
  social: InputJsonValue
  courses?: CourseEnrollmentCreateManyWithoutUserInput | null
  testResults?: TestResultCreateManyWithoutStudentInput | null
}

export type UserCreateOneWithoutTestGradedInput = {
  create?: UserCreateWithoutTestGradedInput
  connect?: UserWhereUniqueInput
}

export type TestResultCreateWithoutStudentInput = {
  createdAt?: Date | string
  result: number
  test: TestCreateOneWithoutTestResultsInput
  gradedBy: UserCreateOneWithoutTestGradedInput
}

export type TestResultCreateManyWithoutStudentInput = {
  create?: Enumerable<TestResultCreateWithoutStudentInput>
  connect?: Enumerable<TestResultWhereUniqueInput>
}

export type UserCreateWithoutCoursesInput = {
  email: string
  firstName: string
  lastName: string
  social: InputJsonValue
  testResults?: TestResultCreateManyWithoutStudentInput | null
  testGraded?: TestResultCreateManyWithoutGradedByInput | null
}

export type UserCreateOneWithoutCoursesInput = {
  create?: UserCreateWithoutCoursesInput
  connect?: UserWhereUniqueInput
}

export type CourseEnrollmentCreateWithoutCourseInput = {
  createdAt?: Date | string
  role: UserRole
  user: UserCreateOneWithoutCoursesInput
}

export type CourseEnrollmentCreateManyWithoutCourseInput = {
  create?: Enumerable<CourseEnrollmentCreateWithoutCourseInput>
  connect?: Enumerable<CourseEnrollmentWhereUniqueInput>
}

export type CourseCreateWithoutTestsInput = {
  name: string
  courseDetails: string
  members?: CourseEnrollmentCreateManyWithoutCourseInput | null
}

export type CourseCreateOneWithoutTestsInput = {
  create?: CourseCreateWithoutTestsInput
  connect?: CourseWhereUniqueInput
}

export type TestCreateWithoutTestResultsInput = {
  updatedAt?: Date | string
  name: string
  date: Date | string
  course: CourseCreateOneWithoutTestsInput
}

export type TestCreateOneWithoutTestResultsInput = {
  create?: TestCreateWithoutTestResultsInput
  connect?: TestWhereUniqueInput
}

export type TestResultCreateWithoutGradedByInput = {
  createdAt?: Date | string
  result: number
  test: TestCreateOneWithoutTestResultsInput
  student: UserCreateOneWithoutTestResultsInput
}

export type TestResultCreateManyWithoutGradedByInput = {
  create?: Enumerable<TestResultCreateWithoutGradedByInput>
  connect?: Enumerable<TestResultWhereUniqueInput>
}

export type UserCreateWithoutTestResultsInput = {
  email: string
  firstName: string
  lastName: string
  social: InputJsonValue
  courses?: CourseEnrollmentCreateManyWithoutUserInput | null
  testGraded?: TestResultCreateManyWithoutGradedByInput | null
}

export type UserCreateOneWithoutTestResultsInput = {
  create?: UserCreateWithoutTestResultsInput
  connect?: UserWhereUniqueInput
}

export type TestResultCreateWithoutTestInput = {
  createdAt?: Date | string
  result: number
  student: UserCreateOneWithoutTestResultsInput
  gradedBy: UserCreateOneWithoutTestGradedInput
}

export type TestResultCreateManyWithoutTestInput = {
  create?: Enumerable<TestResultCreateWithoutTestInput>
  connect?: Enumerable<TestResultWhereUniqueInput>
}

export type TestCreateWithoutCourseInput = {
  updatedAt?: Date | string
  name: string
  date: Date | string
  testResults?: TestResultCreateManyWithoutTestInput | null
}

export type TestCreateManyWithoutCourseInput = {
  create?: Enumerable<TestCreateWithoutCourseInput>
  connect?: Enumerable<TestWhereUniqueInput>
}

export type CourseCreateWithoutMembersInput = {
  name: string
  courseDetails: string
  tests?: TestCreateManyWithoutCourseInput | null
}

export type CourseCreateOneWithoutMembersInput = {
  create?: CourseCreateWithoutMembersInput
  connect?: CourseWhereUniqueInput
}

export type CourseEnrollmentCreateWithoutUserInput = {
  createdAt?: Date | string
  role: UserRole
  course: CourseCreateOneWithoutMembersInput
}

export type CourseEnrollmentCreateManyWithoutUserInput = {
  create?: Enumerable<CourseEnrollmentCreateWithoutUserInput>
  connect?: Enumerable<CourseEnrollmentWhereUniqueInput>
}

export type UserCreateInput = {
  email: string
  firstName: string
  lastName: string
  social: InputJsonValue
  courses?: CourseEnrollmentCreateManyWithoutUserInput | null
  testResults?: TestResultCreateManyWithoutStudentInput | null
  testGraded?: TestResultCreateManyWithoutGradedByInput | null
}

export type UserUpdateWithoutTestGradedDataInput = {
  email?: string
  firstName?: string
  lastName?: string
  social?: InputJsonValue
  courses?: CourseEnrollmentUpdateManyWithoutUserInput | null
  testResults?: TestResultUpdateManyWithoutStudentInput | null
}

export type UserUpsertWithoutTestGradedInput = {
  update: UserUpdateWithoutTestGradedDataInput
  create: UserCreateWithoutTestGradedInput
}

export type UserUpdateOneRequiredWithoutTestGradedInput = {
  create?: UserCreateWithoutTestGradedInput
  connect?: UserWhereUniqueInput
  update?: UserUpdateWithoutTestGradedDataInput
  upsert?: UserUpsertWithoutTestGradedInput
}

export type TestResultUpdateWithoutStudentDataInput = {
  createdAt?: Date | string
  result?: number
  test?: TestUpdateOneRequiredWithoutTestResultsInput | null
  gradedBy?: UserUpdateOneRequiredWithoutTestGradedInput | null
}

export type TestResultUpdateWithWhereUniqueWithoutStudentInput = {
  where: TestResultWhereUniqueInput
  data: TestResultUpdateWithoutStudentDataInput
}

export type TestResultScalarWhereInput = {
  id?: number | IntFilter
  createdAt?: Date | string | DateTimeFilter
  result?: number | IntFilter
  testId?: number | IntFilter
  studentId?: number | IntFilter
  graderId?: number | IntFilter
  AND?: Enumerable<TestResultScalarWhereInput>
  OR?: Array<TestResultScalarWhereInput>
  NOT?: Enumerable<TestResultScalarWhereInput>
}

export type TestResultUpdateManyDataInput = {
  createdAt?: Date | string
  result?: number
}

export type TestResultUpdateManyWithWhereNestedInput = {
  where: TestResultScalarWhereInput
  data: TestResultUpdateManyDataInput
}

export type TestResultUpsertWithWhereUniqueWithoutStudentInput = {
  where: TestResultWhereUniqueInput
  update: TestResultUpdateWithoutStudentDataInput
  create: TestResultCreateWithoutStudentInput
}

export type TestResultUpdateManyWithoutStudentInput = {
  create?: Enumerable<TestResultCreateWithoutStudentInput>
  connect?: Enumerable<TestResultWhereUniqueInput>
  set?: Enumerable<TestResultWhereUniqueInput>
  disconnect?: Enumerable<TestResultWhereUniqueInput>
  delete?: Enumerable<TestResultWhereUniqueInput>
  update?: Enumerable<TestResultUpdateWithWhereUniqueWithoutStudentInput>
  updateMany?: Enumerable<TestResultUpdateManyWithWhereNestedInput> | null
  deleteMany?: Enumerable<TestResultScalarWhereInput>
  upsert?: Enumerable<TestResultUpsertWithWhereUniqueWithoutStudentInput>
}

export type UserUpdateWithoutCoursesDataInput = {
  email?: string
  firstName?: string
  lastName?: string
  social?: InputJsonValue
  testResults?: TestResultUpdateManyWithoutStudentInput | null
  testGraded?: TestResultUpdateManyWithoutGradedByInput | null
}

export type UserUpsertWithoutCoursesInput = {
  update: UserUpdateWithoutCoursesDataInput
  create: UserCreateWithoutCoursesInput
}

export type UserUpdateOneRequiredWithoutCoursesInput = {
  create?: UserCreateWithoutCoursesInput
  connect?: UserWhereUniqueInput
  update?: UserUpdateWithoutCoursesDataInput
  upsert?: UserUpsertWithoutCoursesInput
}

export type CourseEnrollmentUpdateWithoutCourseDataInput = {
  createdAt?: Date | string
  role?: UserRole
  user?: UserUpdateOneRequiredWithoutCoursesInput | null
}

export type CourseEnrollmentUpdateWithWhereUniqueWithoutCourseInput = {
  where: CourseEnrollmentWhereUniqueInput
  data: CourseEnrollmentUpdateWithoutCourseDataInput
}

export type CourseEnrollmentScalarWhereInput = {
  createdAt?: Date | string | DateTimeFilter
  role?: UserRole | UserRoleFilter
  userId?: number | IntFilter
  courseId?: number | IntFilter
  AND?: Enumerable<CourseEnrollmentScalarWhereInput>
  OR?: Array<CourseEnrollmentScalarWhereInput>
  NOT?: Enumerable<CourseEnrollmentScalarWhereInput>
}

export type CourseEnrollmentUpdateManyDataInput = {
  createdAt?: Date | string
  role?: UserRole
}

export type CourseEnrollmentUpdateManyWithWhereNestedInput = {
  where: CourseEnrollmentScalarWhereInput
  data: CourseEnrollmentUpdateManyDataInput
}

export type CourseEnrollmentUpsertWithWhereUniqueWithoutCourseInput = {
  where: CourseEnrollmentWhereUniqueInput
  update: CourseEnrollmentUpdateWithoutCourseDataInput
  create: CourseEnrollmentCreateWithoutCourseInput
}

export type CourseEnrollmentUpdateManyWithoutCourseInput = {
  create?: Enumerable<CourseEnrollmentCreateWithoutCourseInput>
  connect?: Enumerable<CourseEnrollmentWhereUniqueInput>
  set?: Enumerable<CourseEnrollmentWhereUniqueInput>
  disconnect?: Enumerable<CourseEnrollmentWhereUniqueInput>
  delete?: Enumerable<CourseEnrollmentWhereUniqueInput>
  update?: Enumerable<CourseEnrollmentUpdateWithWhereUniqueWithoutCourseInput>
  updateMany?: Enumerable<CourseEnrollmentUpdateManyWithWhereNestedInput> | null
  deleteMany?: Enumerable<CourseEnrollmentScalarWhereInput>
  upsert?: Enumerable<CourseEnrollmentUpsertWithWhereUniqueWithoutCourseInput>
}

export type CourseUpdateWithoutTestsDataInput = {
  name?: string
  courseDetails?: string
  members?: CourseEnrollmentUpdateManyWithoutCourseInput | null
}

export type CourseUpsertWithoutTestsInput = {
  update: CourseUpdateWithoutTestsDataInput
  create: CourseCreateWithoutTestsInput
}

export type CourseUpdateOneRequiredWithoutTestsInput = {
  create?: CourseCreateWithoutTestsInput
  connect?: CourseWhereUniqueInput
  update?: CourseUpdateWithoutTestsDataInput
  upsert?: CourseUpsertWithoutTestsInput
}

export type TestUpdateWithoutTestResultsDataInput = {
  updatedAt?: Date | string
  name?: string
  date?: Date | string
  course?: CourseUpdateOneRequiredWithoutTestsInput | null
}

export type TestUpsertWithoutTestResultsInput = {
  update: TestUpdateWithoutTestResultsDataInput
  create: TestCreateWithoutTestResultsInput
}

export type TestUpdateOneRequiredWithoutTestResultsInput = {
  create?: TestCreateWithoutTestResultsInput
  connect?: TestWhereUniqueInput
  update?: TestUpdateWithoutTestResultsDataInput
  upsert?: TestUpsertWithoutTestResultsInput
}

export type TestResultUpdateWithoutGradedByDataInput = {
  createdAt?: Date | string
  result?: number
  test?: TestUpdateOneRequiredWithoutTestResultsInput | null
  student?: UserUpdateOneRequiredWithoutTestResultsInput | null
}

export type TestResultUpdateWithWhereUniqueWithoutGradedByInput = {
  where: TestResultWhereUniqueInput
  data: TestResultUpdateWithoutGradedByDataInput
}

export type TestResultUpsertWithWhereUniqueWithoutGradedByInput = {
  where: TestResultWhereUniqueInput
  update: TestResultUpdateWithoutGradedByDataInput
  create: TestResultCreateWithoutGradedByInput
}

export type TestResultUpdateManyWithoutGradedByInput = {
  create?: Enumerable<TestResultCreateWithoutGradedByInput>
  connect?: Enumerable<TestResultWhereUniqueInput>
  set?: Enumerable<TestResultWhereUniqueInput>
  disconnect?: Enumerable<TestResultWhereUniqueInput>
  delete?: Enumerable<TestResultWhereUniqueInput>
  update?: Enumerable<TestResultUpdateWithWhereUniqueWithoutGradedByInput>
  updateMany?: Enumerable<TestResultUpdateManyWithWhereNestedInput> | null
  deleteMany?: Enumerable<TestResultScalarWhereInput>
  upsert?: Enumerable<TestResultUpsertWithWhereUniqueWithoutGradedByInput>
}

export type UserUpdateWithoutTestResultsDataInput = {
  email?: string
  firstName?: string
  lastName?: string
  social?: InputJsonValue
  courses?: CourseEnrollmentUpdateManyWithoutUserInput | null
  testGraded?: TestResultUpdateManyWithoutGradedByInput | null
}

export type UserUpsertWithoutTestResultsInput = {
  update: UserUpdateWithoutTestResultsDataInput
  create: UserCreateWithoutTestResultsInput
}

export type UserUpdateOneRequiredWithoutTestResultsInput = {
  create?: UserCreateWithoutTestResultsInput
  connect?: UserWhereUniqueInput
  update?: UserUpdateWithoutTestResultsDataInput
  upsert?: UserUpsertWithoutTestResultsInput
}

export type TestResultUpdateWithoutTestDataInput = {
  createdAt?: Date | string
  result?: number
  student?: UserUpdateOneRequiredWithoutTestResultsInput | null
  gradedBy?: UserUpdateOneRequiredWithoutTestGradedInput | null
}

export type TestResultUpdateWithWhereUniqueWithoutTestInput = {
  where: TestResultWhereUniqueInput
  data: TestResultUpdateWithoutTestDataInput
}

export type TestResultUpsertWithWhereUniqueWithoutTestInput = {
  where: TestResultWhereUniqueInput
  update: TestResultUpdateWithoutTestDataInput
  create: TestResultCreateWithoutTestInput
}

export type TestResultUpdateManyWithoutTestInput = {
  create?: Enumerable<TestResultCreateWithoutTestInput>
  connect?: Enumerable<TestResultWhereUniqueInput>
  set?: Enumerable<TestResultWhereUniqueInput>
  disconnect?: Enumerable<TestResultWhereUniqueInput>
  delete?: Enumerable<TestResultWhereUniqueInput>
  update?: Enumerable<TestResultUpdateWithWhereUniqueWithoutTestInput>
  updateMany?: Enumerable<TestResultUpdateManyWithWhereNestedInput> | null
  deleteMany?: Enumerable<TestResultScalarWhereInput>
  upsert?: Enumerable<TestResultUpsertWithWhereUniqueWithoutTestInput>
}

export type TestUpdateWithoutCourseDataInput = {
  updatedAt?: Date | string
  name?: string
  date?: Date | string
  testResults?: TestResultUpdateManyWithoutTestInput | null
}

export type TestUpdateWithWhereUniqueWithoutCourseInput = {
  where: TestWhereUniqueInput
  data: TestUpdateWithoutCourseDataInput
}

export type TestScalarWhereInput = {
  id?: number | IntFilter
  updatedAt?: Date | string | DateTimeFilter
  name?: string | StringFilter
  date?: Date | string | DateTimeFilter
  courseId?: number | IntFilter
  testResults?: TestResultFilter | null
  AND?: Enumerable<TestScalarWhereInput>
  OR?: Array<TestScalarWhereInput>
  NOT?: Enumerable<TestScalarWhereInput>
}

export type TestUpdateManyDataInput = {
  updatedAt?: Date | string
  name?: string
  date?: Date | string
}

export type TestUpdateManyWithWhereNestedInput = {
  where: TestScalarWhereInput
  data: TestUpdateManyDataInput
}

export type TestUpsertWithWhereUniqueWithoutCourseInput = {
  where: TestWhereUniqueInput
  update: TestUpdateWithoutCourseDataInput
  create: TestCreateWithoutCourseInput
}

export type TestUpdateManyWithoutCourseInput = {
  create?: Enumerable<TestCreateWithoutCourseInput>
  connect?: Enumerable<TestWhereUniqueInput>
  set?: Enumerable<TestWhereUniqueInput>
  disconnect?: Enumerable<TestWhereUniqueInput>
  delete?: Enumerable<TestWhereUniqueInput>
  update?: Enumerable<TestUpdateWithWhereUniqueWithoutCourseInput>
  updateMany?: Enumerable<TestUpdateManyWithWhereNestedInput> | null
  deleteMany?: Enumerable<TestScalarWhereInput>
  upsert?: Enumerable<TestUpsertWithWhereUniqueWithoutCourseInput>
}

export type CourseUpdateWithoutMembersDataInput = {
  name?: string
  courseDetails?: string
  tests?: TestUpdateManyWithoutCourseInput | null
}

export type CourseUpsertWithoutMembersInput = {
  update: CourseUpdateWithoutMembersDataInput
  create: CourseCreateWithoutMembersInput
}

export type CourseUpdateOneRequiredWithoutMembersInput = {
  create?: CourseCreateWithoutMembersInput
  connect?: CourseWhereUniqueInput
  update?: CourseUpdateWithoutMembersDataInput
  upsert?: CourseUpsertWithoutMembersInput
}

export type CourseEnrollmentUpdateWithoutUserDataInput = {
  createdAt?: Date | string
  role?: UserRole
  course?: CourseUpdateOneRequiredWithoutMembersInput | null
}

export type CourseEnrollmentUpdateWithWhereUniqueWithoutUserInput = {
  where: CourseEnrollmentWhereUniqueInput
  data: CourseEnrollmentUpdateWithoutUserDataInput
}

export type CourseEnrollmentUpsertWithWhereUniqueWithoutUserInput = {
  where: CourseEnrollmentWhereUniqueInput
  update: CourseEnrollmentUpdateWithoutUserDataInput
  create: CourseEnrollmentCreateWithoutUserInput
}

export type CourseEnrollmentUpdateManyWithoutUserInput = {
  create?: Enumerable<CourseEnrollmentCreateWithoutUserInput>
  connect?: Enumerable<CourseEnrollmentWhereUniqueInput>
  set?: Enumerable<CourseEnrollmentWhereUniqueInput>
  disconnect?: Enumerable<CourseEnrollmentWhereUniqueInput>
  delete?: Enumerable<CourseEnrollmentWhereUniqueInput>
  update?: Enumerable<CourseEnrollmentUpdateWithWhereUniqueWithoutUserInput>
  updateMany?: Enumerable<CourseEnrollmentUpdateManyWithWhereNestedInput> | null
  deleteMany?: Enumerable<CourseEnrollmentScalarWhereInput>
  upsert?: Enumerable<CourseEnrollmentUpsertWithWhereUniqueWithoutUserInput>
}

export type UserUpdateInput = {
  email?: string
  firstName?: string
  lastName?: string
  social?: InputJsonValue
  courses?: CourseEnrollmentUpdateManyWithoutUserInput | null
  testResults?: TestResultUpdateManyWithoutStudentInput | null
  testGraded?: TestResultUpdateManyWithoutGradedByInput | null
}

export type UserUpdateManyMutationInput = {
  email?: string
  firstName?: string
  lastName?: string
  social?: InputJsonValue
}

export type CourseCreateInput = {
  name: string
  courseDetails: string
  members?: CourseEnrollmentCreateManyWithoutCourseInput | null
  tests?: TestCreateManyWithoutCourseInput | null
}

export type CourseUpdateInput = {
  name?: string
  courseDetails?: string
  members?: CourseEnrollmentUpdateManyWithoutCourseInput | null
  tests?: TestUpdateManyWithoutCourseInput | null
}

export type CourseUpdateManyMutationInput = {
  name?: string
  courseDetails?: string
}

export type CourseEnrollmentCreateInput = {
  createdAt?: Date | string
  role: UserRole
  user: UserCreateOneWithoutCoursesInput
  course: CourseCreateOneWithoutMembersInput
}

export type CourseEnrollmentUpdateInput = {
  createdAt?: Date | string
  role?: UserRole
  user?: UserUpdateOneRequiredWithoutCoursesInput | null
  course?: CourseUpdateOneRequiredWithoutMembersInput | null
}

export type CourseEnrollmentUpdateManyMutationInput = {
  createdAt?: Date | string
  role?: UserRole
}

export type TestCreateInput = {
  updatedAt?: Date | string
  name: string
  date: Date | string
  course: CourseCreateOneWithoutTestsInput
  testResults?: TestResultCreateManyWithoutTestInput | null
}

export type TestUpdateInput = {
  updatedAt?: Date | string
  name?: string
  date?: Date | string
  course?: CourseUpdateOneRequiredWithoutTestsInput | null
  testResults?: TestResultUpdateManyWithoutTestInput | null
}

export type TestUpdateManyMutationInput = {
  updatedAt?: Date | string
  name?: string
  date?: Date | string
}

export type TestResultCreateInput = {
  createdAt?: Date | string
  result: number
  test: TestCreateOneWithoutTestResultsInput
  student: UserCreateOneWithoutTestResultsInput
  gradedBy: UserCreateOneWithoutTestGradedInput
}

export type TestResultUpdateInput = {
  createdAt?: Date | string
  result?: number
  test?: TestUpdateOneRequiredWithoutTestResultsInput | null
  student?: UserUpdateOneRequiredWithoutTestResultsInput | null
  gradedBy?: UserUpdateOneRequiredWithoutTestGradedInput | null
}

export type TestResultUpdateManyMutationInput = {
  createdAt?: Date | string
  result?: number
}

export type IntFilter = {
  equals?: number
  not?: number | IntFilter
  in?: Enumerable<number>
  notIn?: Enumerable<number>
  lt?: number
  lte?: number
  gt?: number
  gte?: number
}

export type DateTimeFilter = {
  equals?: Date | string
  not?: Date | string | DateTimeFilter
  in?: Enumerable<Date | string>
  notIn?: Enumerable<Date | string>
  lt?: Date | string
  lte?: Date | string
  gt?: Date | string
  gte?: Date | string
}

export type StringFilter = {
  equals?: string
  not?: string | StringFilter
  in?: Enumerable<string>
  notIn?: Enumerable<string>
  lt?: string
  lte?: string
  gt?: string
  gte?: string
  contains?: string
  startsWith?: string
  endsWith?: string
}

export type TestResultFilter = {
  every?: TestResultWhereInput
  some?: TestResultWhereInput
  none?: TestResultWhereInput
}

export type CourseEnrollmentFilter = {
  every?: CourseEnrollmentWhereInput
  some?: CourseEnrollmentWhereInput
  none?: CourseEnrollmentWhereInput
}

export type TestFilter = {
  every?: TestWhereInput
  some?: TestWhereInput
  none?: TestWhereInput
}

export type UserRoleFilter = {
  equals?: UserRole
  not?: UserRole | UserRoleFilter
  in?: Enumerable<UserRole>
  notIn?: Enumerable<UserRole>
}

export type JsonFilter = {
  equals?: InputJsonValue
  not?: InputJsonValue | JsonFilter
}

export type UserOrderByInput = {
  id?: OrderByArg | null
  email?: OrderByArg | null
  firstName?: OrderByArg | null
  lastName?: OrderByArg | null
  social?: OrderByArg | null
}

export type CourseEnrollmentOrderByInput = {
  createdAt?: OrderByArg | null
  role?: OrderByArg | null
  userId?: OrderByArg | null
  courseId?: OrderByArg | null
}

export type TestOrderByInput = {
  id?: OrderByArg | null
  updatedAt?: OrderByArg | null
  name?: OrderByArg | null
  date?: OrderByArg | null
  courseId?: OrderByArg | null
}

export type TestResultOrderByInput = {
  id?: OrderByArg | null
  createdAt?: OrderByArg | null
  result?: OrderByArg | null
  testId?: OrderByArg | null
  studentId?: OrderByArg | null
  graderId?: OrderByArg | null
}

export type CourseOrderByInput = {
  id?: OrderByArg | null
  name?: OrderByArg | null
  courseDetails?: OrderByArg | null
}

/**
 * Batch Payload for updateMany & deleteMany
 */

export type BatchPayload = {
  count: number
}

/**
 * DMMF
 */
export declare const dmmf: DMMF.Document;
export {};
