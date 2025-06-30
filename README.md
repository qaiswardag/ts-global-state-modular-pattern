# TypeScript Global State Modular Pattern

This project demonstrates a clean and modular approach to managing global state and business logic in TypeScript using classes and interfaces. The design emphasizes separation of concerns by distributing logic across multiple helper classes (`Two`, `Three`, etc.) while keeping a central controller class (`One`) as the single point of access and orchestration.

---

## Features

- Centralized global state with `getState` and `setState` accessors
- Delegated logic via helper classes
- Clean TypeScript typings and private/public access control
- Scalable structure: easily extend logic by adding more helpers
- Console-based output for demonstration

---

## How to Use

```bash
# Clone the repository
git clone https://github.com/your-username/ts-global-state-modular-pattern.git
cd ts-global-state-modular-pattern
