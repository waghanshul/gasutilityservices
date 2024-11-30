import React from 'react';
import ServiceRequestForm from './components/ServiceRequestForm';
import RequestList from './components/RequestList';
import { Flame } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <div className="container mx-auto flex items-center gap-2">
          <Flame size={24} />
          <h1 className="text-2xl font-bold">Gas Utility Services</h1>
        </div>
      </header>
      
      <main className="container mx-auto py-8 px-4">
        <div className="grid md:grid-cols-2 gap-8">
          <ServiceRequestForm />
          <RequestList />
        </div>
      </main>
    </div>
  );
}

export default App;