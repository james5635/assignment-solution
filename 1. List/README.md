## Note
interface is used to defined the structural contract of an object.
```txt
useState: Changes the value + Triggers a re-render.
useRef: Changes the value + Does NOT trigger a re-render.
```
```tsx
'use client'
import { useState, useRef, useEffect } from "react";
function page() {
    let [a, b] = useState(1)
    let r = useRef(1)
    useEffect(() => {
        console.log("hi")
        r.current += 10
    })

    return (
        <>
            <button
                onClick={() => { r.current += 10; console.log(r.current) }}
            >click me</button>
            useState: {a}
            <br></br>
            useRef: {r.current}
        </>
    )
}

export default page;
```
## Getting Started

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```