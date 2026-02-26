
import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Terminal, Cpu, Database, ChevronDown, ChevronRight, PlayCircle } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const Theory = () => {
    const { theme } = useTheme();
    const { language } = useLanguage(); // Using language for content adjustment if needed
    const [selectedTopic, setSelectedTopic] = useState('js');
    const [expandedSection, setExpandedSection] = useState(null);

    const concepts = [
        {
            id: "js",
            name: "JavaScript",
            icon: Terminal,
            color: "text-yellow-400",
            description: "The language of the web. Master variables, functions, async programming, and modern ES6+ features.",
            topics: [
                {
                    id: "js_basics",
                    title: "1. Variables & Data Types",
                    content: "JavaScript uses `let`, `const`, and `var` (avoid `var` in modern code) to declare variables. Data types include primitives (String, Number, Boolean, Null, Undefined, Symbol) and Objects.",
                    code: `// Modern Declaration
let age = 25; // Mutable
const name = "Kartik"; // Immutable reference

// Data Types
let isActive = true; 
let scores = [10, 20, 30]; // Array
let user = { id: 1, role: "Admin" }; // Object`
                },
                {
                    id: "js_functions",
                    title: "2. Functions & Scope",
                    content: "Functions are reusable blocks of code. Arrow functions provide a concise syntax and handle `this` differently.",
                    code: `// Traditional Function
function add(a, b) {
  return a + b;
}

// Arrow Function
const multiply = (x, y) => x * y;

console.log(add(2, 3)); // 5
console.log(multiply(4, 5)); // 20`
                },
                {
                    id: "js_loops",
                    title: "3. Control Flow (Loops & Conditionals)",
                    content: "Control the flow of execution with `if-else`, `switch`, and loops like `for`, `while`, and `forEach`.",
                    code: `// If-Else
let score = 85;
if (score > 90) console.log("A");
else if (score > 80) console.log("B");

// Loops
const items = ["A", "B", "C"];
for (let item of items) {
  console.log(item); // A, B, C
}`
                },
                {
                    id: "js_async",
                    title: "4. Asynchronous JS (Promises & Async/Await)",
                    content: "Handle operations that take time (like API calls) without blocking the main thread using Promises and async/await.",
                    code: `// Async Function
async function fetchData() {
  try {
    let response = await fetch("https://api.example.com/data");
    let data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}`
                },
                {
                    id: "js_dom",
                    title: "5. DOM Manipulation",
                    content: "interact with the web page directly using the Document Object Model (DOM).",
                    code: `// Select Element
const btn = document.querySelector("#myBtn");

// Add Event Listener
btn.addEventListener("click", () => {
  document.body.style.backgroundColor = "black";
  alert("Dark Mode Activated!");
});`
                }
            ]
        },
        {
            id: "py",
            name: "Python",
            icon: Code,
            color: "text-blue-500",
            description: "A versatile, readable language used for Web Dev, AI, Data Science, and Automation.",
            topics: [
                {
                    id: "py_basics",
                    title: "1. Syntax, Variables & Data Types",
                    content: "Python uses indentation (whitespace) to define blocks. No semicolons or curly braces needed for blocks.",
                    code: `# Variables (Dynamic Typing)
name = "Kartik"
age = 22
rating = 4.9

# Printing
print(f"User {name} is {age} years old.")`
                },
                {
                    id: "py_ds",
                    title: "2. Lists, Tuples, & Dictionaries",
                    content: "Python has powerful built-in data structures. Lists are mutable, Tuples are immutable, Dictionaries are key-value pairs.",
                    code: `# List (Mutable)
fruits = ["Apple", "Banana"]
fruits.append("Cherry")

# Tuple (Immutable)
point = (10, 20)

# Dictionary (Key-Value)
user = {"id": 1, "name": "Kartik"}
print(user["name"])`
                },
                {
                    id: "py_loops",
                    title: "3. Loops & Conditionals",
                    content: "Python supports `for` loops (iterating over sequences) and `while` loops.",
                    code: `# For Loop (Range)
for i in range(5):
    print(i) # 0 to 4

# While Loop
count = 0
while count < 3:
    print("Hello")
    count += 1`
                },
                {
                    id: "py_functions",
                    title: "4. Functions & Modules",
                    content: "Define functions using `def`. Organize code into modules for reusability.",
                    code: `def greet(name="User"):
    return f"Hello, {name}!"

print(greet("Kartik"))

# Importing Modules
import math
print(math.sqrt(16)) # 4.0`
                },
                {
                    id: 'py_oop',
                    title: '5. Object-Oriented Programming (OOP)',
                    content: 'Python supports classes and objects, inheritance, and encapsulation.',
                    code: `class Dog:
    def __init__(self, name):
        self.name = name

    def bark(self):
        return "Woof!"

d = Dog("Buddy")
print(d.name) # Buddy
print(d.bark()) # Woof!`
                }
            ]
        },
        {
            id: "cpp",
            name: "C++",
            icon: Cpu,
            color: "text-indigo-400",
            description: "High-performance language giving you control over system resources and memory.",
            topics: [
                {
                    id: "cpp_basics",
                    title: "1. Syntax, Variables & I/O",
                    content: "C++ is statically typed. Use `cin` and `cout` for Input/Output.",
                    code: `#include <iostream>
using namespace std;

int main() {
    int age;
    cout << "Enter age: ";
    cin >> age;
    cout << "You are " << age << " years old." << endl;
    return 0;
}`
                },
                {
                    id: "cpp_control",
                    title: "2. Control Structures",
                    content: "Standard if-else logic and loops familiar to C-style languages.",
                    code: `int x = 10;

if (x > 5) {
    cout << "Greater than 5";
} else {
    cout << "Less or Equal";
}

for(int i=0; i<5; i++) {
    cout << i << " ";
}`
                },
                {
                    id: "cpp_pointers",
                    title: "3. Pointers & Memory Management",
                    content: "Pointers store memory addresses. Direct memory manipulation is a key feature of C++.",
                    code: `int val = 20;
int* ptr = &val; // Pointer holds address of val

cout << "Address: " << ptr << endl;
cout << "Value: " << *ptr << endl; // Dereferencing`
                },
                {
                    id: 'cpp_oop',
                    title: '4. Classes & Objects',
                    content: 'Define blueprints for objects using classes. Support for public/private access modifiers.',
                    code: `class Car {
  public:
    string brand;
    void honk() {
      cout << "Beep!" << endl;
    }
};

int main() {
  Car myCar;
  myCar.brand = "BMW";
  myCar.honk();
  return 0;
}`
                },
                {
                    id: 'cpp_stl',
                    title: '5. Standard Template Library (STL)',
                    content: 'Use powerful built-in algorithms and data structures like Vectors and Maps.',
                    code: `#include <vector>
#include <algorithm>

vector<int> nums = {4, 1, 3, 2};
sort(nums.begin(), nums.end()); // Sorts vector

for(int n : nums) cout << n << " "; // 1 2 3 4`
                }
            ]
        },
        {
            id: "java",
            name: "Java",
            icon: Database,
            color: "text-red-500",
            description: "Enterprise-standard, object-oriented language running on the JVM.",
            topics: [
                {
                    id: "java_basics",
                    title: "1. Syntax & Main Method",
                    content: "Every Java program starts execution from the `public static void main` method inside a class.",
                    code: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, Java!");
        
        int x = 10;
        double price = 19.99;
        boolean isJavaFun = true;
    }
}`
                },
                {
                    id: "java_oop",
                    title: "2. OOP Core Concepts",
                    content: "Java is strictly Object-Oriented. Everything revolves around Classes and Objects.",
                    code: `class Person {
    String name;
    
    // Constructor
    Person(String n) {
        this.name = n;
    }
    
    void introduce() {
        System.out.println("Hi, I am " + name);
    }
}

// Usage: Person p = new Person("Kartik");`
                },
                {
                    id: 'java_inheritance',
                    title: '3. Inheritance & Polymorphism',
                    content: 'Extend classes using `extends`. Override methods for polymorphic behavior.',
                    code: `class Animal {
    void sound() { System.out.println("Some sound..."); }
}

class Cat extends Animal {
    @Override
    void sound() { System.out.println("Meow"); }
}

Animal a = new Cat();
a.sound(); // Output: Meow`
                },
                {
                    id: 'java_collections',
                    title: '4. Collections Framework',
                    content: 'Lists, Sets, and Maps for handling groups of objects.',
                    code: `import java.util.ArrayList;

ArrayList<String> cars = new ArrayList<String>();
cars.add("Volvo");
cars.add("BMW");

System.out.println(cars.get(0)); // Volvo`
                },
                {
                    id: 'java_exception',
                    title: '5. Exception Handling',
                    content: 'Handle runtime errors gracefully using try-catch blocks.',
                    code: `try {
    int[] numbers = {1, 2, 3};
    System.out.println(numbers[10]); // Error
} catch (Exception e) {
    System.out.println("Something went wrong.");
} finally {
    System.out.println("Process finished.");
}`
                }
            ]
        }
    ];

    const currentConcept = concepts.find(c => c.id === selectedTopic);

    return (
        <div className={`min-h-screen p-6 lg:p-12 transition-colors duration-300
      ${theme === 'dark' ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-900'}
    `}>
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* Topic Sidebar */}
                <div className="lg:col-span-3 space-y-4">
                    <h2 className="text-xl font-bold mb-6 px-2">{t('Languages')}</h2>
                    {concepts.map((concept) => (
                        <button
                            key={concept.id}
                            onClick={() => setSelectedTopic(concept.id)}
                            className={`w-full flex items-center space-x-3 p-4 rounded-xl transition-all duration-200 border
                ${selectedTopic === concept.id
                                    ? 'bg-primary/10 border-primary shadow-lg shadow-primary/10'
                                    : theme === 'dark'
                                        ? 'bg-slate-800/50 border-slate-700/50 hover:bg-slate-800'
                                        : 'bg-white border-slate-200 hover:bg-slate-50'}
              `}
                        >
                            <div className={`p-2 rounded-lg bg-slate-100 dark:bg-slate-900 ${concept.color}`}>
                                <concept.icon size={20} />
                            </div>
                            <span className={`font-semibold ${selectedTopic === concept.id ? 'text-primary' : ''}`}>
                                {concept.name}
                            </span>
                        </button>
                    ))}
                </div>

                {/* Content Area */}
                <div className="lg:col-span-9">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={selectedTopic}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            {/* Header for content */}
                            <div className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-primary/10 to-transparent border border-primary/20">
                                <div className="flex items-center space-x-3 mb-2">
                                    <currentConcept.icon size={32} className={currentConcept.color} />
                                    <h1 className="text-3xl font-bold">{currentConcept.name} {t('Documentation')}</h1>
                                </div>
                                <p className="text-slate-500 dark:text-slate-400 max-w-2xl text-lg">
                                    {currentConcept.description}
                                </p>
                            </div>

                            {/* Topics List */}
                            <div className="space-y-4">
                                {currentConcept.topics.map((topic) => (
                                    <div
                                        key={topic.id}
                                        className={`rounded-2xl border overflow-hidden transition-all duration-300
                      ${theme === 'dark' ? 'bg-slate-800/30 border-slate-700' : 'bg-white border-slate-200'}
                      ${expandedSection === topic.id ? 'ring-1 ring-primary/50' : ''}
                    `}
                                    >
                                        <button
                                            onClick={() => setExpandedSection(expandedSection === topic.id ? null : topic.id)}
                                            className="w-full flex items-center justify-between p-6 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                                        >
                                            <div className="flex items-center space-x-3">
                                                <PlayCircle size={20} className="text-primary" />
                                                <span className="font-semibold text-lg">{topic.title}</span>
                                            </div>
                                            {expandedSection === topic.id ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                                        </button>

                                        <AnimatePresence>
                                            {expandedSection === topic.id && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    className="overflow-hidden"
                                                >
                                                    <div className="p-6 pt-0 border-t border-slate-200 dark:border-slate-700">
                                                        <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                                                            {topic.content}
                                                        </p>

                                                        <div className="rounded-xl overflow-hidden text-sm shadow-2xl">
                                                            <div className="bg-[#1e1e1e] p-2 flex items-center space-x-2 border-b border-slate-700">
                                                                <div className="w-3 h-3 rounded-full bg-red-500" />
                                                                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                                                <div className="w-3 h-3 rounded-full bg-green-500" />
                                                                <span className="ml-2 text-xs text-slate-500">example.code</span>
                                                            </div>
                                                            <SyntaxHighlighter
                                                                language={currentConcept.id === 'js' ? 'javascript' : currentConcept.id === 'py' ? 'python' : 'cpp'}
                                                                style={vscDarkPlus}
                                                                customStyle={{ margin: 0, padding: '1.5rem' }}
                                                            >
                                                                {topic.code}
                                                            </SyntaxHighlighter>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                ))}
                            </div>

                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default Theory;
