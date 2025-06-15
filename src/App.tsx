import React from 'react'

const App: React.FC = () => {
  return (
    <main className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <section className="relative py-3 sm:max-w-xl sm:mx-auto">
        <article className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <h1 className="text-3xl font-bold text-center mb-8 text-indigo-600">
            Welcome to React + Tailwind
          </h1>
          <p className="text-center text-gray-700 sm:text-lg">
            This is a starter template with React and Tailwind CSS.
          </p>
        </article>
      </section>
    </main>
  )
}

export default App 