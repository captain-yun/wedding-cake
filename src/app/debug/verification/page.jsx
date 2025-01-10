'use client';

import { useState } from 'react';

export default function VerificationDebugPage() {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch('/api/debug-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code })
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Debug request failed:', error);
      setResult({ error: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Verification Debug Tool</h1>
      
      {/* 입력 폼 */}
      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <div>
          <label className="block text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
            placeholder="test@example.com"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Verification Code</label>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
            placeholder="123456"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {isLoading ? 'Checking...' : 'Debug Verification'}
        </button>
      </form>

      {/* 결과 표시 */}
      {result && (
        <div className="space-y-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h2 className="font-semibold mb-2">Input Data & Types</h2>
            <pre className="whitespace-pre-wrap bg-white p-2 rounded">
              {JSON.stringify({ 
                inputData: result.inputData,
                types: result.types 
              }, null, 2)}
            </pre>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h2 className="font-semibold mb-2">All Verifications</h2>
            <pre className="whitespace-pre-wrap bg-white p-2 rounded">
              {JSON.stringify(result.queries.allVerifications, null, 2)}
            </pre>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h2 className="font-semibold mb-2">Exact Match Result</h2>
            <pre className="whitespace-pre-wrap bg-white p-2 rounded">
              {JSON.stringify(result.queries.exactMatch, null, 2)}
            </pre>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h2 className="font-semibold mb-2">Case Insensitive Result</h2>
            <pre className="whitespace-pre-wrap bg-white p-2 rounded">
              {JSON.stringify(result.queries.caseInsensitive, null, 2)}
            </pre>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h2 className="font-semibold mb-2">Recent Verifications</h2>
            <pre className="whitespace-pre-wrap bg-white p-2 rounded">
              {JSON.stringify(result.queries.recentVerifications, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
} 