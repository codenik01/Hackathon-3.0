
const TEACHER_TEMPLATE = (topic, simple, theory, code, intuition, risk, complexity) => `
## 🧠 ${topic}: Senior Engineer & Teacher Analysis

### 1. 🐣 Simple Explanation
${simple}

### 2. 📖 Detailed Theory
${theory}

### 3. 💻 Code Examples (Production Grade)
${code}

### 4. 🔍 Line-by-Line Logic
- **Line 1-3:** Initializes the core variables / imports.
- **Line 5:** The main logic execution starts here.
- **Line 8:** Returns the calculated result safely.

### 5. 💡 Intuition (Why it works)
${intuition}

### 6. ⚠️ Common Mistakes & Best Practices
${risk}

### 7. ⏱️ Complexity Analysis
${complexity}
`;

const C_PLUS_PLUS = TEACHER_TEMPLATE(
    "C++ Language",
    "C++ is a high-performance programming language used for building game engines, operating systems, and browsers. Think of it as C with 'superpowers' (classes and objects).",
    "C++ introduces Object-Oriented Programming (OOP) features like Inheritance, Polymorphism, and Encapsulation to C. It allows direct memory manipulation via pointers but offers high-level abstractions like vectors.",
    `\`\`\`cpp
#include <iostream>
#include <vector>

class Greeter {
public:
    void sayHello(std::string name) {
        std::cout << "Hello, " << name << "!" << std::endl;
    }
};

int main() {
    Greeter g;
    g.sayHello("Student");
    return 0;
}
\`\`\``,
    "C++ works because it compiles directly to machine code, making it incredibly fast. It gives you control over every byte of memory.",
    "❌ **Mistake:** Forgetting to free memory (Memory Leaks).\n✅ **Best Practice:** Use Smart Pointers (`std::unique_ptr`) instead of raw pointers.",
    "**Time:** Compilation is slow, Execution is fast.\n**Space:** Depends on manual management."
);

const REACT_JS = TEACHER_TEMPLATE(
    "React.js",
    "React is a library for building user interfaces using 'components' (like Lego blocks). It updates only the parts of the screen that change.",
    "React uses a 'Virtual DOM'. Instead of updating the real browser DOM (which is slow), it updates a lightweight copy in memory, compares it with the previous version (Diffing), and then updates only the specific changes (Reconciliation).",
    `\`\`\`jsx
import React, { useState } from 'react';

function Counter() {
    const [count, setCount] = useState(0);

    return (
        <button onClick={() => setCount(count + 1)}>
            Count: {count}
        </button>
    );
}
\`\`\``,
    "React works because DOM manipulation is the most expensive operation in a browser. By minimizing it, React makes apps feel instant.",
    "❌ **Mistake:** Mutating state directly (`count = count + 1`).\n✅ **Best Practice:** Always use the setter function (`setCount`).",
    "**Time:** O(n) for Diffing (Linear to tree size)."
);

const UNIVERSAL_FALLBACK = `
## ⚠️ Teacher Mode: Offline Fallback

I am currently unable to reach the neural cloud (API Error).
However, I can still teach you core concepts from my **Emergency Local Knowledge Base**.

**Try asking about:**
- C++ / Programming
- React.js / Frontend
- Arrays / Loops
- System Design
`;

const CPP_LOOPS = TEACHER_TEMPLATE(
    "C++ Loops (Iteration Statements)",
    "Loops ka matlab hai ek hi kaam ko baar-baar repeat karna jab tak koi condition true ho. Jaise agar aapko 1 se 100 tak ginti likhni hai, toh aap 100 baar code nahi likhenge, balki ek loop use karenge.",
    "C++ mein teen main types ke loops hote hain:\n1. **For Loop:** Jab humein pehle se pata ho ki loop kitni baar chalega.\n2. **While Loop:** Jab loop tab tak chalana ho jab tak condition true rahe (Entry-controlled).\n3. **Do-While Loop:** Ye kam se kam ek baar zaroor chalta hai, chahe condition false ho (Exit-controlled).",
    `\`\`\`cpp
// 1. For Loop Example
for(int i = 1; i <= 5; i++) {
    cout << i << " ";
}
// Output: 1 2 3 4 5

// 2. While Loop Example
int j = 1;
while(j <= 5) {
    cout << j << " ";
    j++;
}
// Output: 1 2 3 4 5
\`\`\``,
    "Loops works on the principle of 'Iteration'. Iteration machine code mein ek jump instruction ki tarah hoti hai jo control ko waapas upar bhej deti hai jab tak condition match na ho.",
    "❌ **Mistake:** Infinite loops (Condition hamesha true rehna).\n✅ **Best Practice:** Hamesha loop variable ko properly increment/decrement karein.",
    "**Time:** O(N) - Loop jitni baar chalega utna time lagega.\n**Space:** O(1) - Hum sirf extra counter variable use karte hain."
);

export const KNOWLEDGE_BASE = {
    'universal': UNIVERSAL_FALLBACK,
    'c++': C_PLUS_PLUS,
    'cpp': C_PLUS_PLUS,
    'c plus plus': C_PLUS_PLUS,
    'react': REACT_JS,
    'reactjs': REACT_JS,
    'react.js': REACT_JS,
    'js': "JavaScript is the language of the web...",
    'javascript': "JavaScript is the language of the web...",
    'array': "Arrays are contiguous memory blocks...",
    'loop': CPP_LOOPS,
    'loops': CPP_LOOPS,
    'for': CPP_LOOPS,
    'while': CPP_LOOPS
};
