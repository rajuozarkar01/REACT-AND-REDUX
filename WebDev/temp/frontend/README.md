Error: Failed to scan for dependencies from entries:
G:/REACT AND REDUX/WebDev/temp/frontend/index.html

X [ERROR] The JSX syntax extension is not currently enabled

    src/components/Register.js:39:4:
      39 │     <div className="bg-white p-6 rounded-lg shadow-md w-full max-w...
         ╵     ^

         *The error you're seeing is due to esbuild treating .js files as plain JavaScript without JSX support. Since your Register.js and other React components use JSX, esbuild needs to parse them correctly.*
