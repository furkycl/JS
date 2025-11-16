import type { Module } from "@/components/ModuleCard";

export const juniorIntro =
  "Start with the core building blocks of JavaScript: variables, types, functions, arrays/objects, control flow and basic DOM operations. Go beyond syntax with explanations of why patterns matter, common pitfalls, and practical examples you can copy, tweak, and run. Build a sturdy foundation before moving to async code, modules, and architecture.";

export const juniorModules: Module[] = [
  {
    slug: "variables-and-types",
    title: "Variables & Types",
    description:
      "Understand let/const, primitive vs reference types, and how coercion works.",
    topics: [
      {
        title: "let vs const",
        explanation:
          "Use const by default; switch to let only when you reassign. Avoid var in modern code.",
        code: `const name = "Ada"; // constant binding
let count = 0;    // reassigned later
count += 1;

// var is function-scoped and hoisted; avoid
// var legacy = 42;`,
        notes: [
          "const, referansı değil değeri sabitler; nesne/array içini değiştirebilirsiniz.",
          "var fonksiyon kapsamlıdır ve hoisting yüzünden beklenmedik davranışlara yol açar.",
          "let blok kapsamlıdır; tekrar tanımlamaya izin vermez (re-declare).",
        ],
        moreExamples: [
          `const settings = { theme: 'dark' }\nsettings.theme = 'light'; // ok\n// settings = {} // TypeError: Assignment to constant variable`,
        ],
      },
      {
        title: "Primitives vs objects",
        explanation:
          "Primitives are copied by value; objects/arrays are references.",
        code: `let a = 1;
let b = a; // value copy
b++;
console.log(a, b); // 1, 2

const obj1 = { x: 1 };
const obj2 = obj1; // reference copy
obj2.x = 2;
console.log(obj1.x); // 2`,
        notes: [
          "Primitives (string, number, boolean, null, undefined, symbol, bigint) değerdir.",
          "Objeler ve diziler referanstır; kopyalamak için spread veya structuredClone kullanın.",
        ],
        moreExamples: [
          `const arr1 = [1,2];\nconst arr2 = arr1;\narr2.push(3);\nconsole.log(arr1); // [1,2,3]`,
        ],
      },
      {
        title: "Truthiness & equality",
        explanation:
          "Understand which values are falsy and prefer strict equality (===) to avoid coercion surprises.",
        code: `// falsy values: false, 0, -0, 0n, "", null, undefined, NaN
if ("") console.log('won\'t run');
if ([]) console.log('arrays are truthy');

// == does coercion; === compares without coercion
console.log('0' == 0, '0' === 0); // true, false

// Avoid loose equality corner cases
console.log(null == undefined); // true (loose)
console.log(null === undefined); // false (strict)`,
        notes: [
          "Her zaman === ve !== tercih edin; çift eşittir nadir, kontrollü durumlarda kullanılmalı.",
          "Boş array [], boş obje {} truthy'dir; koşullarda dikkatli olun.",
        ],
      },
    ],
  },
  {
    slug: "functions-and-parameters",
    title: "Functions & Parameters",
    description:
      "Declare functions, use default/rest parameters, and return values cleanly.",
    topics: [
      {
        title: "Function forms",
        explanation:
          "Prefer function declarations for hoisting or arrows for concise callbacks.",
        code: `function add(a, b) { return a + b }
const mul = (a, b) => a * b;
console.log(add(2, 3), mul(2, 3)); // 5, 6`,
        notes: [
          "Function declaration hoisted olduğu için dosyanın ilerisinde de çağrılabilir.",
          "Arrow fonksiyonlar kısa callback'lerde idealdir; kendi this bağlamları yoktur.",
        ],
      },
      {
        title: "Defaults & rest",
        explanation:
          "Default missing arguments and collect variable arguments with rest.",
        code: `function greet(name = "friend") { return \`Hello, \${name}!\` }
function sum(...nums) { return nums.reduce((a, n) => a + n, 0) }
console.log(greet(), sum(1,2,3));`,
        notes: [
          "Default parametreler yalnızca argüman undefined olduğunda devreye girer.",
          "Rest parametreleri gerçek bir dizi döndürür; arguments objesinden daha kullanışlıdır.",
        ],
        moreExamples: [
          `function parsePort(v = '3000'){ return Number(v) }\nconsole.log(parsePort(), parsePort('8080'));`,
        ],
      },
      {
        title: "Arrow functions & this",
        explanation:
          "Arrow functions capture the surrounding this and are great for callbacks; use function declarations/methods when you need dynamic this.",
        code: `const obj = {
  count: 0,
  incLater() {
    setTimeout(() => { this.count++; console.log(this.count); }, 10);
  }
};
obj.incLater();

// Using a regular function inside setTimeout would have a different this.`,
      },
    ],
  },
  {
    slug: "arrays-and-objects",
    title: "Arrays & Objects",
    description:
      "Use map/filter/reduce, destructuring, and spread for expressive code.",
    topics: [
      {
        title: "Destructuring & spread",
        explanation:
          "Pick fields concisely and copy/merge without mutating the original.",
        code: `const user = { id: 1, name: "Ada", city: "London" };
const { name, ...rest } = user; // rest = { id, city }
const copy = { ...user, city: "Paris" };`,
        notes: [
          "Destructuring ile eksik alanlara varsayılan atayabilirsiniz: const {x = 0} = obj;",
          "Spread sırası önemlidir; sağdaki değer soldakileri ezer.",
        ],
      },
      {
        title: "Map/Filter/Reduce",
        explanation:
          "Transform, filter, and fold arrays in a functional style.",
        code: `const nums = [1,2,3,4];
const doubled = nums.map(n => n*2);
const evens = nums.filter(n => n%2===0);
const sum = nums.reduce((a,n)=>a+n,0);
console.log(doubled, evens, sum);`,
        notes: [
          "map/filter orijinal diziyi değiştirmez; immutability için idealdir.",
          "reduce başlangıç değeri vermek (0) hataları önler.",
        ],
        moreExamples: [
          `const words = ['a','bb','ccc'];\nconst totalLen = words.reduce((a,w)=>a+w.length,0);`,
        ],
      },
      {
        title: "Mutation vs immutability",
        explanation:
          "Prefer non-mutating methods in stateful UIs; make copies when changing arrays/objects.",
        code: `const arr = [1,2,3];
// mutate
arr.push(4); // arr becomes [1,2,3,4]

// immutable alternatives
const arr2 = [...arr, 5];
const removed = arr.filter(n => n !== 2);

const user = { id: 1, name: 'Ada' };
const renamed = { ...user, name: 'Grace' };`,
      },
    ],
  },
  {
    slug: "control-flow",
    title: "Control Flow",
    description:
      "Write readable conditionals and loops; prefer early returns and for..of.",
    topics: [
      {
        title: "Readable conditionals",
        explanation:
          "Guard clauses keep nesting shallow and intent clear.",
        code: `function canDrive(age) {
  if (age == null) return false;
  if (age < 18) return false;
  return true;
}`,
        notes: [
          "Erken dön (early return) ile iç içe if bloklarını azaltın.",
          "Karmaşık koşulları iyi isimlendirilmiş yardımcı fonksiyonlara çıkarın.",
        ],
      },
      {
        title: "Looping",
        explanation: "for..of is great for arrays; for..in is for keys.",
        code: `for (const ch of "JS") console.log(ch);
for (const [i, v] of ["a","b"].entries()) console.log(i, v);`,
        notes: [
          "for..of iterable'lar için uygundur; for..in anahtarları döner ve objelerde kullanılır.",
        ],
      },
      {
        title: "Object lookup over switch",
        explanation:
          "Replace long switch chains with a dictionary of handlers for clarity and O(1) lookup.",
        code: `const handlers = {
  info: (m) => console.info(m),
  warn: (m) => console.warn(m),
  error: (m) => console.error(m)
};
const log = (level, msg) => (handlers[level] ?? console.log)(msg);
log('warn', 'Heads up');`,
      },
    ],
  },
  {
    slug: "strings-and-numbers",
    title: "Strings & Numbers",
    description:
      "Format strings, parse numbers safely, and handle rounding.",
    topics: [
      {
        title: "Templates & padStart",
        explanation: "Template literals and padding simplify formatting.",
        code: "`ID-${String(42).padStart(5, '0')}` // ID-00042",
        notes: [
          "Template literal ile satır içi değişken yerleştirme ve çok satırlı string yazabilirsiniz.",
        ],
      },
      {
        title: "Parsing & rounding",
        explanation: "Number() beats parseInt for strict numeric conversion.",
        code: `Number("2.5") // 2.5\nMath.round(2.49) // 2\nMath.ceil(2.01) // 3`,
        notes: [
          "parseInt ikinci argüman olarak radix ister; Number daha sık tercih edilir.",
        ],
      },
      {
        title: "NaN, finite, and parsing",
        explanation:
          "Use Number.isNaN and Number.isFinite; parseInt takes a radix; prefer Number for clean numeric strings.",
        code: `Number.isNaN(NaN) // true
isNaN('foo') // true (coerces!)
Number.isNaN('foo' as any) // false (no coercion)

Number.isFinite(42) // true
Number.isFinite(Infinity) // false

parseInt('08', 10) // 8
Number('08') // 8`,
      },
    ],
  },
  {
    slug: "dom-basics",
    title: "DOM Basics",
    description:
      "Select elements and react to events without heavy frameworks.",
    topics: [
      {
        title: "Selecting & events",
        explanation:
          "Use querySelector and addEventListener for ergonomic DOM code.",
        code: `const btn = document.querySelector('#btn');
btn?.addEventListener('click', () => {
  console.log('Clicked!');
});`,
        notes: [
          "Optional chaining (?.) ile null güvenli erişim sağlayın.",
          "Tekrarlı manipülasyonlarda reflow/repainte dikkat edin; sınıf ekleyip çıkarma tercih edin.",
        ],
      },
      {
        title: "Creating & inserting",
        explanation:
          "Create elements, set attributes, and insert efficiently using fragments.",
        code: `const ul = document.querySelector('#list');
const frag = document.createDocumentFragment();
for (let i = 1; i <= 3; i++) {
  const li = document.createElement('li');
  li.textContent = 'Item ' + i;
  frag.appendChild(li);
}
ul?.appendChild(frag);`,
      },
      {
        title: "Event delegation",
        explanation:
          "Listen once on a parent and handle child events via matches().",
        code: `document.addEventListener('click', (e) => {
  const t = e.target as HTMLElement;
  if (t.matches('.todo-item button.remove')) {
    console.log('Remove clicked for', t.closest('.todo-item')?.id);
  }
});`,
      },
    ],
  },
];

export const midIntro =
  "Level up with async JavaScript, modules, classes, error handling, and a solid mental model of the event loop. Learn to structure code for reliability, handle errors gracefully, make network calls responsibly, and compose modules for reuse.";

export const midModules: Module[] = [
  {
    slug: "promises",
    title: "Promises",
    description:
      "Model async work with Promises; chain with then/catch/finally.",
    topics: [
      {
        title: "Creating promises",
        explanation:
          "Wrap async operations; resolve on success, reject on errors.",
        code: `function wait(ms) {
  return new Promise((res) => setTimeout(res, ms));
}
wait(200).then(() => console.log('done'));`,
        notes: [
          "Promise executor senkron çalışır; içinde hata atarsanız otomatik reject olur.",
          "Bir promise sadece bir kez settle olur (resolve/reject).",
        ],
      },
      {
        title: "Errors & chaining",
        explanation:
          "Return values in then and handle errors with catch; finally runs either way.",
        code: `fetch('/api/data')
  .then(r => { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
  .then(data => console.log('data', data))
  .catch(err => console.error('failed', err))
  .finally(() => console.log('done'));`,
      },
      {
        title: "Promise.all",
        explanation:
          "Run in parallel and fail fast if any promise rejects.",
        code: `Promise.all([
  fetch('/a'),
  fetch('/b')
]).then(([a, b]) => {/* ... */})`,
        notes: [
          "Promise.all ilk hata ile topluca reddeder; hepsinin sonucunu görmek için allSettled kullanın.",
        ],
      },
      {
        title: "allSettled & race",
        explanation:
          "allSettled waits for all results; race resolves/rejects on the first settled promise.",
        code: `const urls = ['/a','/b','/c'];
Promise.allSettled(urls.map(u => fetch(u))).then(results => {
  const successes = results.filter(r => r.status === 'fulfilled');
  console.log('ok:', successes.length);
});

Promise.race([
  fetch('/slow'),
  new Promise((_, rej) => setTimeout(() => rej(new Error('timeout')), 2000))
]).catch(e => console.error(e.message));`,
      },
    ],
  },
  {
    slug: "async-await",
    title: "Async/Await",
    description: "Write async code that reads like sync code.",
    topics: [
      {
        title: "Try/catch",
        explanation: "Handle rejections with try/catch around await calls.",
        code: `async function loadUser(id) {
  try {
    const res = await fetch(\`/api/users/\${id}\`);
    if (!res.ok) throw new Error('Failed');
    return res.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}`,
        notes: [
          "await ile atılan hataları try/catch ile yakalayın; finally bloklarında temizlik yapın.",
        ],
      },
      {
        title: "Parallel awaits",
        explanation: "Start work first, then await both for speed.",
        code: `const aP = fetch('/a');
const bP = fetch('/b');
const [a, b] = await Promise.all([aP, bP]);`,
        notes: [
          "Bağımsız istekleri paralel başlatmak toplam süreyi kısaltır.",
        ],
      },
      {
        title: "Timeout & AbortController",
        explanation:
          "Use AbortController to cancel fetch on timeout or user action.",
        code: `async function getWithTimeout(url, ms = 2000){
  const ac = new AbortController();
  const t = setTimeout(() => ac.abort(), ms);
  try {
    const r = await fetch(url, { signal: ac.signal });
    if (!r.ok) throw new Error('HTTP ' + r.status);
    return await r.json();
  } finally { clearTimeout(t); }
}`,
      },
    ],
  },
  {
    slug: "es-modules",
    title: "ES Modules (import/export)",
    description:
      "Split code into files; use named and default exports.",
    topics: [
      {
        title: "Named vs default",
        explanation:
          "Use named for multiple exports; default for a primary export.",
        code: `// math.js
export function add(a,b){return a+b}
export default function mul(a,b){return a*b}
// usage
import mul, { add } from './math.js';`,
        notes: [
          "Bir modülde yalnızca bir default export olabilir; isimlendirilmiş export birden fazla olabilir.",
          "İsimlendirilmiş export/import otomatik refactor ve tree-shaking için daha uygundur.",
        ],
      },
      {
        title: "Re-exports",
        explanation: "Re-export from an index to centralize imports.",
        code: `// index.js
export * from './math.js';
export { default as mul } from './math.js';`,
      },
      {
        title: "Module scope & live bindings",
        explanation:
          "Each module has its own scope; named exports are live bindings that update when values change.",
        code: `// counter.js
export let count = 0;
export function inc(){ count++; }

// usage.js
import { count, inc } from './counter.js';
console.log(count); // 0
inc();
console.log(count); // 1`,
      },
    ],
  },
  {
    slug: "classes-and-prototypes",
    title: "Classes & Prototypes",
    description: "Declare classes, instance methods, and static helpers.",
    topics: [
      {
        title: "Class basics",
        explanation: "Use constructor, methods, and static utilities.",
        code: `class Point {
  constructor(x, y) { this.x = x; this.y = y }
  dist() { return Math.hypot(this.x, this.y) }
  static origin() { return new Point(0,0) }
}
console.log(Point.origin().dist());`,
        notes: [
          "static metotlar sınıfın üzerinde çağrılır; örnek (instance) üzerinde değil.",
        ],
      },
      {
        title: "Extends",
        explanation: "Inherit behavior with extends and super().",
        code: `class Animal { speak(){ return '...' } }
class Dog extends Animal { speak(){ return 'woof' } }
console.log(new Dog().speak());`,
      },
      {
        title: "Private fields & accessors",
        explanation:
          "Use #private for encapsulation and getters/setters for derived or validated properties.",
        code: `class User {
  #pwHash;
  constructor(name, pwHash){ this.name = name; this.#pwHash = pwHash }
  get firstInitial(){ return this.name[0]; }
  set passwordHash(h){ this.#pwHash = h }
}
const u = new User('Ada', 'hash');
console.log(u.firstInitial); // 'A'`,
      },
    ],
  },
  {
    slug: "error-handling",
    title: "Error Handling",
    description: "Throw errors with context and recover gracefully.",
    topics: [
      {
        title: "Custom errors",
        explanation:
          "Include meaningful messages; prefer throwing Error subclasses.",
        code: `class NotFoundError extends Error { constructor(m){ super(m) } }
function get(id){ throw new NotFoundError('User not found') }
try { get(1) } catch(e){ console.error(e.message) }`,
        notes: [
          "Error.name ve stack izleri hata ayıklamada yardımcıdır.",
          "Alan eklemek isterseniz sınıfınıza own field'lar tanımlayın.",
        ],
      },
      {
        title: "finally",
        explanation: "Release resources regardless of success or failure.",
        code: `lock();
try { /* work */ }
catch (e) { /* handle */ }
finally { unlock(); }`,
      },
      {
        title: "Error cause & wrapping",
        explanation:
          "Preserve original errors using the cause option for easier debugging.",
        code: `try {
  await doNetwork();
} catch (e) {
  throw new Error('Fetching user failed', { cause: e });
}`,
      },
    ],
  },
  {
    slug: "event-loop",
    title: "Event Loop",
    description:
      "Understand tasks vs microtasks: setTimeout vs Promise callbacks.",
    topics: [
      {
        title: "Microtasks first",
        explanation:
          "Promise callbacks run before timeouts in the same tick.",
        code: `setTimeout(()=>console.log('timeout'));
Promise.resolve().then(()=>console.log('microtask'));
// logs: microtask, then timeout`,
        notes: [
          "Microtask kuyruğu (Promise callbacks) zamanlayıcılardan önce çalışır; sıralama önemliyse dikkate alın.",
        ],
      },
      {
        title: "queueMicrotask",
        explanation:
          "Schedule a microtask explicitly to run before timers in the same tick.",
        code: `queueMicrotask(() => console.log('microtask'));
setTimeout(() => console.log('timeout'), 0);
console.log('sync');
// logs: sync, microtask, timeout`,
      },
    ],
  },
];

export const seniorIntro =
  "Deep dive into patterns, performance, testing, and architecture for resilient, maintainable JavaScript at scale. Learn to reason about complexity, design extensible modules, measure real performance, and build systems that are easy to test and evolve.";

export const seniorModules: Module[] = [
  {
    slug: "performance",
    title: "Performance & Big-O",
    description:
      "Reason about complexity and avoid accidental quadratic work.",
    topics: [
      {
        title: "Avoid nested loops",
        explanation:
          "Prefer sets/maps to drop inner loops when deduplicating.",
        code: `const arr = [1,2,2,3];
const dedup = [...new Set(arr)]; // O(n)
console.log(dedup);`,
        notes: [
          "İç içe döngüler genelde O(n^2) maliyet doğurur; veri yapılarıyla sadeleştirin.",
        ],
      },
      {
        title: "Memoization",
        explanation: "Cache pure function results by input.",
        code: `function memo(fn){
  const cache = new Map();
  return (x)=> cache.has(x) ? cache.get(x) : cache.set(x, fn(x)).get(x);
}
const slow = n=> n<2?n:slow(n-1)+slow(n-2);
const fast = memo(slow);`,
      },
      {
        title: "Measure, don’t guess",
        explanation:
          "Benchmark hot paths with performance.now and isolate IO from pure work.",
        code: `const t0 = performance.now();
heavyWork();
console.log('ms', performance.now() - t0);`,
      },
      {
        title: "Avoid unnecessary copies",
        explanation:
          "When processing large arrays, avoid spreading/cloning unless needed; reuse buffers when safe.",
        code: `// Instead of [...arr] repeatedly, pass references to read-only helpers
function max(arr){ return arr.reduce((m,n)=>n>m?n:m, -Infinity); }
console.log(max(hugeArray));`,
      },
    ],
  },
  {
    slug: "design-patterns",
    title: "Design Patterns",
    description: "Apply factory and strategy patterns idiomatically in JS.",
    topics: [
      {
        title: "Factory",
        explanation: "Encapsulate creation; return objects with behavior.",
        code: `function createLogger(level='info'){
  return { log: (...a)=> console[level](...a) };
}
const logger = createLogger('warn');
logger.log('Heads up');`,
        notes: [
          "Factory, kurulum detaylarını soyutlar ve testte mock'lamayı kolaylaştırır.",
        ],
      },
      {
        title: "Strategy",
        explanation: "Swap algorithms at runtime via a map.",
        code: `const strategies = {
  json: (d)=> JSON.stringify(d),
  text: (d)=> String(d)
};
function serialize(data, kind='json'){ return strategies[kind](data) }
serialize({a:1}, 'text');`,
      },
      {
        title: "Observer (pub/sub)",
        explanation:
          "Decouple producers from consumers; let many listeners react to events.",
        code: `function createPubSub(){
  const subs = new Map();
  return {
    on(evt, fn){ (subs.get(evt) ?? subs.set(evt, new Set()).get(evt)).add(fn); },
    off(evt, fn){ subs.get(evt)?.delete(fn); },
    emit(evt, data){ subs.get(evt)?.forEach(fn => fn(data)); }
  };
}
const bus = createPubSub();
bus.on('tick', n => console.log('tick', n));
bus.emit('tick', 1);`,
      },
    ],
  },
  {
    slug: "immutability",
    title: "Immutability & FP",
    description: "Favor pure functions and immutable updates for predictability.",
    topics: [
      {
        title: "Immutable updates",
        explanation: "Copy-on-write with spread keeps state predictable.",
        code: `const state = { items: [1,2] };
const next = { ...state, items: [...state.items, 3] };`,
        notes: [
          "Referans eşitliğiyle değişiklik tespiti (shallow compare) daha kolay olur.",
        ],
      },
      {
        title: "Composition",
        explanation: "Compose tiny functions for clarity and reuse.",
        code: `const trim = s=>s.trim();
const lower = s=>s.toLowerCase();
const compose = (...fns)=>(x)=>fns.reduceRight((v,f)=>f(v),x);
const normalize = compose(lower, trim);
normalize('  Hello  ');`,
      },
      {
        title: "Deep updates",
        explanation:
          "Update nested structures immutably with shallow copies at each level.",
        code: `const state = { user: { profile: { name: 'Ada', city: 'London' } } };
const next = {
  ...state,
  user: {
    ...state.user,
    profile: { ...state.user.profile, city: 'Paris' }
  }
};`,
      },
    ],
  },
  {
    slug: "robustness-testing",
    title: "Robustness & Testing",
    description:
      "Design for testability; isolate side effects; write minimal assertions.",
    topics: [
      {
        title: "Pure core",
        explanation: "Pure functions are trivial to test.",
        code: `function add(a,b){ return a+b }
console.assert(add(2,2)===4);`,
      },
      {
        title: "Boundary adapters",
        explanation:
          "Wrap IO (fetch/localStorage) so core logic stays deterministic.",
        code: `async function getJson(fetchImpl, url){
  const r = await fetchImpl(url);
  if(!r.ok) throw new Error('HTTP');
  return r.json();
}
// inject fetchImpl in tests`,
      },
      {
        title: "Async tests & timers",
        explanation:
          "Use fake timers or controlled clocks to make time-based code deterministic in tests.",
        code: `// Example with Jest-like APIs
jest.useFakeTimers();
const fn = jest.fn();
setTimeout(fn, 1000);
jest.advanceTimersByTime(1000);
expect(fn).toHaveBeenCalled();`,
      },
    ],
  },
  {
    slug: "bundling-and-tree-shaking",
    title: "Bundling & Tree-Shaking",
    description: "Export only what you need; prefer ESM for DCE.",
    topics: [
      {
        title: "Named exports",
        explanation:
          "Tree-shakers remove unused named exports more reliably.",
        code: `// utils.js
export const used = ()=>{};
export const unused = ()=>{}; // dropped by DCE if unused`,
        notes: [
          "Yan etki içeren modüller tree-shake edilemez; sideEffects ayarı önemlidir.",
        ],
      },
      {
        title: "Code splitting",
        explanation:
          "Load heavy modules lazily to improve startup performance.",
        code: `// dynamic import
import('heavy-module').then(m => m.run());`,
      },
      {
        title: "Side effects",
        explanation:
          "Mark packages as side-effect free to enable tree-shaking; avoid running code at import unless necessary.",
        code: `// package.json
{
  "name": "lib",
  "sideEffects": false
}
// Keep initialization inside functions instead of top-level imports when possible.`,
      },
    ],
  },
];
