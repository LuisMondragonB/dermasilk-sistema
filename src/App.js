import React, { useState } from 'react';
import { Users, Calendar, DollarSign, Star, Plus, CheckCircle, Phone, MessageCircle, Gift, Camera, TrendingUp, Settings, Wifi, Download, Upload, Award } from 'lucide-react';

const DermasilkMembershipSystem = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loyverseConnected] = useState(true);
  const [lastSync, setLastSync] = useState('2025-07-28 14:30');
  
  const [members, setMembers] = useState([
    {
      id: 1,
      name: "Ana García",
      phone: "443-123-4567",
      email: "ana@email.com",
      membershipType: "Estándar (8 meses)",
      area: "Piernas Completas",
      sessionsCompleted: 5,
      totalSessions: 8,
      monthlyPayment: 750,
      depositPaid: 750,
      status: "Activa",
      startDate: "2025-01-15",
      progress: 62.5,
      referredBy: "Facebook Ads",
      loyverseId: "CUST_001",
      rewardPoints: 125,
      vipStatus: false,
      satisfaction: 5,
      beforeAfterPhotos: 3
    },
    {
      id: 2,
      name: "María López", 
      phone: "443-987-6543",
      email: "maria@email.com",
      membershipType: "Premium (12 meses)",
      area: "Brazos + Axilas",
      sessionsCompleted: 8,
      totalSessions: 12,
      monthlyPayment: 1000,
      depositPaid: 700,
      status: "Activa",
      startDate: "2024-12-01",
      progress: 66.7,
      referredBy: "Referido - Ana García",
      loyverseId: "CUST_002",
      rewardPoints: 240,
      vipStatus: true,
      satisfaction: 5,
      beforeAfterPhotos: 5
    },
    {
      id: 3,
      name: "Carmen Ruiz",
      phone: "443-555-1234", 
      email: "carmen@email.com",
      membershipType: "Básica (6 meses)",
      area: "Rostro",
      sessionsCompleted: 6,
      totalSessions: 6,
      monthlyPayment: 600,
      depositPaid: 600,
      status: "Completada",
      startDate: "2024-11-01",
      progress: 100,
      referredBy: "Google",
      loyverseId: "CUST_003",
      rewardPoints: 350,
      vipStatus: true,
      satisfaction: 5,
      beforeAfterPhotos: 4
    }
  ]);

  const [appointments] = useState([
    { id: 1, clientName: "Ana García", area: "Piernas Completas", date: "2025-08-15", time: "10:00", status: "Confirmada" },
    { id: 2, clientName: "María López", area: "Brazos", date: "2025-08-20", time: "14:30", status: "Pendiente" },
    { id: 3, clientName: "Carmen Ruiz", area: "Axilas", date: "2025-08-22", time: "16:00", status: "Confirmada" }
  ]);

  const [newMember, setNewMember] = useState({
    name: '', phone: '', email: '', membershipType: '', area: '', depositPaid: 0
  });

  const [showNewMemberForm, setShowNewMemberForm] = useState(false);
  const [showLoyverseSync, setShowLoyverseSync] = useState(false);

  const totalMembers = members.length;
  const activeMembers = members.filter(m => m.status === 'Activa').length;
  const monthlyRevenue = members.filter(m => m.status === 'Activa').reduce((sum, m) => sum + m.monthlyPayment, 0);
  const guaranteeRate = ((members.filter(m => m.satisfaction >= 4).length / totalMembers) * 100).toFixed(1);
  const vipMembers = members.filter(m => m.vipStatus).length;
  const totalRewardPoints = members.reduce((sum, m) => sum + m.rewardPoints, 0);

  const syncWithLoyverse = () => {
    setLastSync(new Date().toLocaleString());
    alert('Sincronización con Loyverse completada exitosamente');
  };

  const addNewMember = () => {
    if (newMember.name && newMember.phone && newMember.membershipType) {
      const membershipTypes = {
        'Básica (6 meses)': { sessions: 6, monthly: 800 },
        'Estándar (8 meses)': { sessions: 8, monthly: 750 },
        'Premium (12 meses)': { sessions: 12, monthly: 700 }
      };

      const typeInfo = membershipTypes[newMember.membershipType];
      
      const member = {
        id: members.length + 1,
        ...newMember,
        sessionsCompleted: 0,
        totalSessions: typeInfo.sessions,
        monthlyPayment: typeInfo.monthly,
        status: "Activa",
        startDate: new Date().toISOString().split('T')[0],
        progress: 0,
        loyverseId: `CUST_00${members.length + 1}`,
        rewardPoints: 50,
        vipStatus: false,
        satisfaction: 0,
        beforeAfterPhotos: 0
      };
      
      setMembers([...members, member]);
      setNewMember({ name: '', phone: '', email: '', membershipType: '', area: '', depositPaid: 0 });
      setShowNewMemberForm(false);
    }
  };

  const Dashboard = () => (
    <div className="space-y-6">
      <div className="bg-green-50 border-green-400 p-4 rounded-lg border-l-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Wifi className="h-5 w-5 text-green-600" />
            <div>
              <p className="font-medium text-green-800">
                Loyverse POS Conectado
              </p>
              <p className="text-sm text-gray-600">Última sincronización: {lastSync}</p>
            </div>
          </div>
          <button 
            onClick={syncWithLoyverse}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center space-x-2"
          >
            <Download className="h-4 w-4" />
            <span>Sincronizar</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-r from-pink-500 to-pink-600 text-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-pink-100 text-sm">Total Miembros</p>
              <p className="text-3xl font-bold">{totalMembers}</p>
            </div>
            <Users className="h-12 w-12 text-pink-200" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Membresías Activas</p>
              <p className="text-3xl font-bold">{activeMembers}</p>
              <p className="text-green-100 text-xs">{vipMembers} VIP</p>
            </div>
            <CheckCircle className="h-12 w-12 text-green-200" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">Ingresos Mensuales</p>
              <p className="text-3xl font-bold">${monthlyRevenue.toLocaleString()}</p>
            </div>
            <DollarSign className="h-12 w-12 text-purple-200" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm">Garantía de Resultados</p>
              <p className="text-3xl font-bold">{guaranteeRate}%</p>
            </div>
            <Star className="h-12 w-12 text-orange-200" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center space-x-2">
            <Calendar className="h-5 w-5" />
            <span>Próximas Citas</span>
          </h3>
          <div className="space-y-3">
            {appointments.slice(0, 5).map(apt => (
              <div key={apt.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                <div>
                  <p className="font-medium text-gray-800">{apt.clientName}</p>
                  <p className="text-sm text-gray-600">{apt.area} - {apt.date} {apt.time}</p>
                </div>
              <div className="bg-gradient-to-r from-green-400 to-green-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                FDA APROBADO
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'dashboard', name: 'Dashboard', icon: Star },
              { id: 'members', name: 'Miembros', icon: Users },
              { id: 'appointments', name: 'Citas', icon: Calendar },
              { id: 'reports', name: 'Reportes', icon: TrendingUp }
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'border-pink-500 text-pink-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'members' && <MembersTab />}
        {activeTab === 'appointments' && (
          <div className="text-center py-12">
            <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Módulo de Citas</h3>
            <p className="text-gray-600">Funcionalidad en desarrollo</p>
          </div>
        )}
        {activeTab === 'reports' && <SimpleReportsTab />}
      </div>
    </div>
  );
};

export default DermasilkMembershipSystem;
                <span className={`px-2 py-1 rounded-full text-xs ${
                  apt.status === 'Confirmada' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {apt.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center space-x-2">
            <MessageCircle className="h-5 w-5" />
            <span>WhatsApp Automatizado</span>
          </h3>
          <div className="space-y-3">
            <div className="p-3 border rounded-lg">
              <p className="font-medium text-gray-800">Ana García</p>
              <p className="text-sm text-gray-600">Recordatorio enviado</p>
              <p className="text-xs text-gray-500">2025-07-27 09:00</p>
            </div>
            <div className="p-3 border rounded-lg">
              <p className="font-medium text-gray-800">María López</p>
              <p className="text-sm text-gray-600">Tips post-sesión</p>
              <p className="text-xs text-gray-500">2025-07-26 16:30</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center space-x-2">
            <Gift className="h-5 w-5" />
            <span>Sistema de Recompensas</span>
          </h3>
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-3 rounded-lg border border-yellow-200">
              <div className="flex justify-between items-center">
                <span className="font-medium text-yellow-800">Puntos Totales</span>
                <span className="text-2xl font-bold text-yellow-900">{totalRewardPoints.toLocaleString()}</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Miembros VIP</span>
                <span className="text-sm font-medium">{vipMembers}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Referidos este mes</span>
                <span className="text-sm font-medium">3</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const MembersTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Gestión de Miembros Dermasilk®</h2>
        <div className="flex space-x-3">
          <button 
            onClick={() => setShowLoyverseSync(true)}
            className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-lg hover:from-green-600 hover:to-green-700 flex items-center space-x-2"
          >
            <Upload className="h-5 w-5" />
            <span>Sync Loyverse</span>
          </button>
          <button 
            onClick={() => setShowNewMemberForm(true)}
            className="bg-gradient-to-r from-pink-500 to-pink-600 text-white px-4 py-2 rounded-lg hover:from-pink-600 hover:to-pink-700 flex items-center space-x-2"
          >
            <Plus className="h-5 w-5" />
            <span>Nuevo Miembro</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Membresía</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progreso</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recompensas</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {members.map(member => (
                <tr key={member.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col">
                      <div className="flex items-center space-x-2">
                        <div className="text-sm font-medium text-gray-900">{member.name}</div>
                        {member.vipStatus && <Award className="h-4 w-4 text-yellow-500" />}
                      </div>
                      <div className="text-sm text-gray-500">{member.area}</div>
                      <div className="text-xs text-gray-400 flex items-center space-x-1">
                        <Phone className="h-3 w-3" />
                        <span>{member.phone}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{member.membershipType}</div>
                    <div className="text-xs text-gray-500">Inicio: {member.startDate}</div>
                    <div className="text-xs text-gray-500">${member.monthlyPayment}/mes</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col space-y-1">
                      <div className="text-sm text-gray-900">{member.sessionsCompleted}/{member.totalSessions} sesiones</div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${member.progress}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-gray-500">{member.progress.toFixed(1)}% completado</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col space-y-1">
                      <div className="flex items-center space-x-1">
                        <Gift className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm font-medium">{member.rewardPoints} pts</span>
                      </div>
                      <div className="text-xs text-gray-500">{member.beforeAfterPhotos} fotos</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      member.status === 'Activa' ? 'bg-green-100 text-green-800' :
                      member.status === 'Completada' ? 'bg-blue-100 text-blue-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {member.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button className="text-blue-600 hover:text-blue-900">
                      <MessageCircle className="h-4 w-4" />
                    </button>
                    <button className="text-green-600 hover:text-green-900">
                      <Camera className="h-4 w-4" />
                    </button>
                    <button className="text-purple-600 hover:text-purple-900">
                      <Settings className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showNewMemberForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4 text-pink-600">Nuevo Miembro Dermasilk®</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Nombre completo"
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                value={newMember.name}
                onChange={(e) => setNewMember({...newMember, name: e.target.value})}
              />
              <input
                type="tel"
                placeholder="Teléfono"
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                value={newMember.phone}
                onChange={(e) => setNewMember({...newMember, phone: e.target.value})}
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                value={newMember.email}
                onChange={(e) => setNewMember({...newMember, email: e.target.value})}
              />
              <select
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                value={newMember.membershipType}
                onChange={(e) => setNewMember({...newMember, membershipType: e.target.value})}
              >
                <option value="">Tipo de Membresía</option>
                <option value="Básica (6 meses)">Básica (6 meses) - $800/mes</option>
                <option value="Estándar (8 meses)">Estándar (8 meses) - $750/mes</option>
                <option value="Premium (12 meses)">Premium (12 meses) - $700/mes</option>
              </select>
              <input
                type="text"
                placeholder="Área de tratamiento"
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                value={newMember.area}
                onChange={(e) => setNewMember({...newMember, area: e.target.value})}
              />
            </div>
            <div className="flex space-x-3 mt-6">
              <button
                onClick={addNewMember}
                className="flex-1 bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 transition-colors duration-200"
              >
                Crear Miembro
              </button>
              <button
                onClick={() => setShowNewMemberForm(false)}
                className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition-colors duration-200"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {showLoyverseSync && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4 text-green-600">Sincronización con Loyverse</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 border rounded-lg">
                <Wifi className="h-5 w-5 text-green-500" />
                <div>
                  <p className="font-medium">Estado: Conectado</p>
                  <p className="text-sm text-gray-600">Última sync: {lastSync}</p>
                </div>
              </div>
            </div>
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => {syncWithLoyverse(); setShowLoyverseSync(false);}}
                className="flex-1 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors duration-200"
              >
                Sincronizar Ahora
              </button>
              <button
                onClick={() => setShowLoyverseSync(false)}
                className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition-colors duration-200"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const SimpleReportsTab = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 flex items-center space-x-2">
        <TrendingUp className="h-6 w-6" />
        <span>Reportes Dermasilk®</span>
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Métricas Clave</h3>
          <div className="space-y-4">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-blue-600">85%</div>
              <div className="text-sm text-gray-600">Tasa de Retención</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-green-600">$750</div>
              <div className="text-sm text-gray-600">Ticket Promedio</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-purple-600">4.8</div>
              <div className="text-sm text-gray-600">Satisfacción Promedio</div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Ingresos Mensuales</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 border rounded-lg">
              <span className="font-medium text-gray-700">Julio 2025</span>
              <span className="text-green-600 font-bold">$28,500</span>
            </div>
            <div className="flex justify-between items-center p-3 border rounded-lg">
              <span className="font-medium text-gray-700">Junio 2025</span>
              <span className="text-green-600 font-bold">$25,200</span>
            </div>
            <div className="flex justify-between items-center p-3 border rounded-lg">
              <span className="font-medium text-gray-700">Mayo 2025</span>
              <span className="text-green-600 font-bold">$22,800</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Áreas Populares</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 border rounded-lg">
              <span className="font-medium text-gray-700">Piernas Completas</span>
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">8 clientes</span>
            </div>
            <div className="flex justify-between items-center p-3 border rounded-lg">
              <span className="font-medium text-gray-700">Axilas</span>
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">6 clientes</span>
            </div>
            <div className="flex justify-between items-center p-3 border rounded-lg">
              <span className="font-medium text-gray-700">Brazos</span>
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">4 clientes</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-2 rounded-lg">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Dermasilk® - Sistema de Membresías</h1>
                <p className="text-sm text-gray-500">Depilación Láser Diodo Trío FDA</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm font-medium text-gray-900">Dermasilk®</div>
                <div className="text-xs text-gray-500">Morelia, Michoacán</div>
