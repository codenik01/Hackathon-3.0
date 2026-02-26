export const questData = {
    1: {
        title: "C Basics: The Foundation",
        questions: [
            {
                id: 1,
                type: "multiple-choice",
                question: "Which of the following serves as the entry point for a C program?",
                options: ["start()", "main()", "init()", "program()"],
                correctAnswer: 1,
                explanation: "The main() function is the starting point of any C program execution."
            },
            {
                id: 2,
                type: "multiple-choice",
                question: "Which symbol is used to terminate a statement in C?",
                options: [".", ":", ";", ","],
                correctAnswer: 2,
                explanation: "The semicolon (;) is used to terminate statements in C."
            },
            {
                id: 3,
                type: "code-completion",
                question: "Complete the code to print an integer variable 'x'.",
                codeSnippet: "printf(\"%__\", x);",
                options: ["d", "s", "f", "c"],
                correctAnswer: 0,
                explanation: "%d is the format specifier for integers in printf."
            },
            {
                id: 4,
                type: "multiple-choice",
                question: "Which function is used to read input from the user?",
                options: ["print()", "input()", "scanf()", "read()"],
                correctAnswer: 2,
                explanation: "scanf() is the standard C function for reading formatted input."
            },
            {
                id: 5,
                type: "multiple-choice",
                question: "How do you write a single-line comment in C?",
                options: ["# Comment", "<!-- Comment -->", "// Comment", "/* Comment */"],
                correctAnswer: 2,
                explanation: "// is used for single-line comments in C (C99 standard and later)."
            }
        ]
    },
    2: {
        title: "C++ OOPs Concepts",
        questions: [
            {
                id: 1,
                type: "multiple-choice",
                question: "Which concept allows binding of data and functions together?",
                options: ["Abstraction", "Encapsulation", "Polymorphism", "Inheritance"],
                correctAnswer: 1,
                explanation: "Encapsulation bundles data (variables) and methods (functions) that operate on the data into a single unit (class)."
            },
            {
                id: 2,
                type: "multiple-choice",
                question: "What is the correct syntax for inheritance in C++?",
                options: ["class B : public A", "class B inherits A", "class B extends A", "class B implements A"],
                correctAnswer: 0,
                explanation: "In C++, 'class Derived : accessSpecifier Base' is used for inheritance."
            },
            {
                id: 3,
                type: "multiple-choice",
                question: "Which function is automatically called when an object is created?",
                options: ["Destructor", "Constructor", "Initializer", "Builder"],
                correctAnswer: 1,
                explanation: "A constructor is a special member function which is called automatically upon object creation."
            },
            {
                id: 4,
                type: "multiple-choice",
                question: "Which access specifier hides data from outside classes but allows it in derived classes?",
                options: ["public", "private", "protected", "friend"],
                correctAnswer: 2,
                explanation: "Protected members are accessible in the class itself and derived classes."
            },
            {
                id: 5,
                type: "multiple-choice",
                question: "What does Polymorphism mean?",
                options: ["Many forms", "Single form", "No form", "Hidden form"],
                correctAnswer: 0,
                explanation: "Polymorphism literally means 'many forms', allowing entities to take on different meanings in different contexts."
            }
        ]
    },
    3: {
        title: "Python: AI & Scripting",
        questions: [
            {
                id: 1,
                type: "multiple-choice",
                question: "Which keyword is used to import a library in Python?",
                options: ["include", "using", "import", "require"],
                correctAnswer: 2,
                explanation: "'import' is used to bring in external modules or libraries in Python."
            },
            {
                id: 2,
                type: "code-completion",
                question: "Create a list named 'fruits'.",
                codeSnippet: "fruits = _ 'apple', 'banana' _",
                options: ["( )", "{ }", "[ ]", "< >"],
                correctAnswer: 2,
                explanation: "Lists in Python are defined using square brackets []."
            },
            {
                id: 3,
                type: "multiple-choice",
                question: "What is the output of print(2 ** 3)?",
                options: ["6", "8", "9", "5"],
                correctAnswer: 1,
                explanation: "** is the exponentiation operator in Python. 2 to the power of 3 is 8."
            },
            {
                id: 4,
                type: "multiple-choice",
                question: "Python relies on _____ to define scope (instead of curly braces).",
                options: ["Semicolons", "Parentheses", "Indentation", "Comments"],
                correctAnswer: 2,
                explanation: "Python uses whitespace indentation to define code blocks."
            },
            {
                id: 5,
                type: "multiple-choice",
                question: "Which function gives the length of a list?",
                options: ["count()", "size()", "length()", "len()"],
                correctAnswer: 3,
                explanation: "len() is the built-in Python function to get the number of items in an object."
            }
        ]
    },
    4: {
        title: "HTML5 Structure",
        questions: [
            {
                id: 1,
                type: "multiple-choice",
                question: "Which tag is used to create a hyperlink?",
                options: ["<link>", "<a>", "<href>", "<url>"],
                correctAnswer: 1,
                explanation: "The <a> (anchor) tag is used to define hyperlinks."
            },
            {
                id: 2,
                type: "multiple-choice",
                question: "What does HTML stand for?",
                options: ["Hyper Text Makeup Language", "Hyper Tech Making Language", "Hyper Text Markup Language", "High Tech Markup Language"],
                correctAnswer: 2,
                explanation: "HTML stands for Hyper Text Markup Language."
            },
            {
                id: 3,
                type: "code-completion",
                question: "Closing tag for an image element.",
                codeSnippet: "<img src='pic.jpg' _",
                options: [">", "/>", "</img>", "None of these"],
                correctAnswer: 1, // Standard void element
                explanation: "Image tags are void elements and don't strictly require a closing tag in HTML5, but /> is often used."
            },
            {
                id: 4,
                type: "multiple-choice",
                question: "Which tag creates a bulleted list?",
                options: ["<ol>", "<li>", "<ul>", "<list>"],
                correctAnswer: 2,
                explanation: "<ul> creates an Unordered List (bulleted)."
            },
            {
                id: 5,
                type: "multiple-choice",
                question: "Which heading tag has the largest font size by default?",
                options: ["<h6 >", "<h1>", "<header>", "<head>"],
                correctAnswer: 1,
                explanation: "<h1> defines the most important (and usually largest) heading."
            }
        ]
    },
    5: {
        title: "CSS3 Styling Mastery",
        questions: [
            {
                id: 1,
                type: "multiple-choice",
                question: "Which property is used to change the background color?",
                options: ["color", "bgcolor", "background-color", "bg-color"],
                correctAnswer: 2,
                explanation: "The background-color property sets the background color of an element."
            },
            {
                id: 2,
                type: "code-completion",
                question: "Select the element with id 'header'.",
                codeSnippet: "_header { color: red; }",
                options: [".", "#", "*", "&"],
                correctAnswer: 1,
                explanation: "The # symbol is used to select elements by their ID."
            },
            {
                id: 3,
                type: "multiple-choice",
                question: "How do you make text bold in CSS?",
                options: ["font-weight: bold;", "style: bold;", "font: bold;", "text-decoration: bold;"],
                correctAnswer: 0,
                explanation: "font-weight: bold; is the correct property to make text bold."
            },
            {
                id: 4,
                type: "multiple-choice",
                question: "Which property controls the space INSIDE an element's border?",
                options: ["Margin", "Padding", "Spacing", "Gutter"],
                correctAnswer: 1,
                explanation: "Padding is the space between the content and the border."
            },
            {
                id: 5,
                type: "multiple-choice",
                question: "Which unit is relative to the font-size of the root element?",
                options: ["em", "px", "rem", "%"],
                correctAnswer: 2,
                explanation: "rem stands for Root E M, relative to the root html element's font size."
            }
        ]
    },
    6: {
        title: "JavaScript Interactivity",
        questions: [
            {
                id: 1,
                type: "multiple-choice",
                question: "Which symbol is used for comments in JS?",
                options: ["#", "//", "<!--", "**"],
                correctAnswer: 1,
                explanation: "// is used for single-line comments in JavaScript."
            },
            {
                id: 2,
                type: "multiple-choice",
                question: "How to declare a constant variable?",
                options: ["var", "let", "const", "constant"],
                correctAnswer: 2,
                explanation: "The 'const' keyword is used to declare variables whose values cannot be reassigned."
            },
            {
                id: 3,
                type: "multiple-choice",
                question: "Which method is used to output data to the console?",
                options: ["console.print()", "console.log()", "print()", "log()"],
                correctAnswer: 1,
                explanation: "console.log() is the standard method to print outputs for debugging."
            },
            {
                id: 4,
                type: "multiple-choice",
                question: "What does '===' check?",
                options: ["Value only", "Type only", "Value and Type", "Memory address"],
                correctAnswer: 2,
                explanation: "The strict equality operator (===) checks both value and data type."
            },
            {
                id: 5,
                type: "code-completion",
                question: "Define a function named 'hello'.",
                codeSnippet: "___ hello() { return 'Hi'; }",
                options: ["def", "func", "function", "void"],
                correctAnswer: 2,
                explanation: "The 'function' keyword is used to define functions in JavaScript."
            }
        ]
    },
    7: {
        title: "Data Structures (DSA)",
        questions: [
            {
                id: 1,
                type: "multiple-choice",
                question: "Which data structure follows LIFO (Last In First Out)?",
                options: ["Queue", "Stack", "Array", "Tree"],
                correctAnswer: 1,
                explanation: "A Stack follows the LIFO principle."
            },
            {
                id: 2,
                type: "multiple-choice",
                question: "What is the time complexity of accessing an element in an array?",
                options: ["O(1)", "O(n)", "O(log n)", "O(n^2)"],
                correctAnswer: 0,
                explanation: "Array access by index is a constant time operation, O(1)."
            },
            {
                id: 3,
                type: "multiple-choice",
                question: "Which data structure is best for a chaotic list of items?",
                options: ["Stack", "Queue", "Hash Map", "Linked List"],
                correctAnswer: 2,
                explanation: "Hash Maps provide efficient key-value lookups, often O(1) on average."
            },
            {
                id: 4,
                type: "multiple-choice",
                question: "Which data structure follows FIFO (First In First Out)?",
                options: ["Stack", "Queue", "Graph", "Heap"],
                correctAnswer: 1,
                explanation: "A Queue processes elements in the order they arrived (First In, First Out)."
            },
            {
                id: 5,
                type: "multiple-choice",
                question: "Which sorting algorithm typically has O(n^2) complexity?",
                options: ["Merge Sort", "Quick Sort", "Bubble Sort", "Heap Sort"],
                correctAnswer: 2,
                explanation: "Bubble Sort has a worst-case and average-case time complexity of O(n^2)."
            }
        ]
    },
    8: {
        title: "System Architecture",
        questions: [
            {
                id: 1,
                type: "multiple-choice",
                question: "What does CPU stand for?",
                options: ["Central Process Unit", "Central Processing Unit", "Computer Personal Unit", "Central Processor Unit"],
                correctAnswer: 1,
                explanation: "CPU stands for Central Processing Unit."
            },
            {
                id: 2,
                type: "multiple-choice",
                question: "Which memory is volatile?",
                options: ["ROM", "HDD", "RAM", "SSD"],
                correctAnswer: 2,
                explanation: "RAM (Random Access Memory) is volatile, meaning it loses data when power is lost."
            },
            {
                id: 3,
                type: "multiple-choice",
                question: "What is the binary representation of decimal 5?",
                options: ["101", "110", "100", "111"],
                correctAnswer: 0,
                explanation: "Binary for 5 is 101 (4 + 0 + 1)."
            },
            {
                id: 4,
                type: "multiple-choice",
                question: "Which component acts as the 'brain' of the computer?",
                options: ["Hard Drive", "GPU", "CPU", "Motherboard"],
                correctAnswer: 2,
                explanation: "The CPU executes instructions and controls other components, acting as the brain."
            },
            {
                id: 5,
                type: "multiple-choice",
                question: "What memory is used for high-speed access by the CPU?",
                options: ["Cache", "HDD", "USB", "DVD"],
                correctAnswer: 0,
                explanation: "Cache is a small, high-speed memory located close to the CPU core."
            }
        ]
    }
};
