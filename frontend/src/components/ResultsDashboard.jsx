import React from 'react';

export default function ResultsDashboard({ result }) {
  if (!result || !result.quantities || !result.costBreakdown) {
    return null;
  }

  const { quantities = {}, costBreakdown = {}, totalCost = 0, currency = '₹' } = result;

  const items = [
    { name: 'Cement', qty: `${quantities.cementBags || 0} Bags`, cost: costBreakdown.cement || 0, icon: '🧱' },
    { name: 'Sand', qty: `${quantities.sandTons || 0} Tons`, cost: costBreakdown.sand || 0, icon: '⏳' },
    { name: 'Coarse Aggregate', qty: `${quantities.aggregateTons || 0} Tons`, cost: costBreakdown.aggregate || 0, icon: '🪨' },
    { name: 'Bricks', qty: `${quantities.brickQuantity || 0} Pcs`, cost: costBreakdown.bricks || 0, icon: '🏠' },
    { name: 'TMT Steel', qty: `${quantities.steelKg || 0} Kg (${quantities.steelTons || 0} T)`, cost: costBreakdown.steel || 0, icon: '🏗️' },
    { name: 'Labor Effort', qty: `${quantities.laborDays || 0} Days`, cost: costBreakdown.labor || 0, icon: '👷' },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-100 pb-4 gap-2">
        <div>
          <h2 className="text-xl font-bold text-slate-800">2. Calculation Results</h2>
          <p className="text-sm text-slate-500">
            Total Built-Up Area: <span className="font-semibold text-slate-700">{quantities.totalBuiltUpSqFt || 0} sq.ft</span> (~{quantities.totalBuiltUpSqM || 0} m²)
          </p>
        </div>
        <div className="bg-indigo-50 border border-indigo-100 px-4 py-2 rounded-xl text-right">
          <span className="block text-xs font-semibold text-indigo-600 uppercase tracking-wider">Estimated Total Cost</span>
          <span className="text-2xl font-extrabold text-indigo-700">{currency} {Number(totalCost).toLocaleString('en-IN')}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {items.map((item) => (
          <div key={item.name} className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">{item.icon}</span>
              <div>
                <h4 className="text-sm font-bold text-slate-800">{item.name}</h4>
                <p className="text-xs font-semibold text-indigo-600">{item.qty}</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-sm font-bold text-slate-800">{currency} {Number(item.cost).toLocaleString('en-IN')}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}