import React, { useState, useEffect } from 'react';
import { Users, Calendar, DollarSign, Star, Plus, Search, Filter, ChevronRight, AlertCircle, CheckCircle, Clock, Phone, Mail, MapPin, MessageCircle, Gift, Camera, TrendingUp, Settings, Wifi, Download, Upload, Bell, Heart, Award } from 'lucide-react';

const DermasilkMembershipSystem = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loyverseConnected, setLoyverseConnected] = useState(true);
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
      nextAppointment: "2025-08-15",
      status: "Activa",
      startDate: "2025-01-15",
      progress: 62.5,
      referredBy: "Facebook Ads",
      notes: "Cliente refiere efectividad desde sesión 1",
      loyverseId: "CUST_001",
      rewardPoints: 125,
      vipStatus: false,
      lastWhatsApp: "2025-07-25",
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
      nextAppointment: "2025-08-20",
      status: "Activa",
      startDate: "2024-12-01",
      progress: 66.7,
      referredBy: "Referido - Ana García",
      notes: "Muy satisfecha, considera agregar piernas",
      loyverseId: "CUST_002",
      rewardPoints: 240,
      vipStatus: true,
      lastWhatsApp: "2025-07-27",
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
      nextAppointment: "Completado",
      status: "Completada",
      startDate: "2024-11-01",
      progress: 100,
      referredBy: "Google",
      notes: "100% satisfecha - candidata para programa VIP",
      loyverseId: "CUST_003",
      rewardPoints: 350,
      vipStatus: true,
      lastWhatsApp: "2025-07-20",
      satisfaction: 5,
      beforeAfterPhotos: 4
    },
    {
      id: 4,
      name: "Sofia Hernández",
      phone: "443-321-9876",
      email: "sofia@email.com", 
      membershipType: "Familiar Premium",
      area: "Axilas + Bikini (Madre e Hija)",
      sessionsCompleted: 3,
      totalSessions: 8,
      monthlyPayment: 1200,
      depositPaid: 1200,
      nextAppointment: "2025-08-22",
      status: "Activa",
      startDate: "2025-05-01",
      progress: 37.5,
      referredBy: "Programa Padrinos - Empresa Local",
      notes: "Membresía corporativa - muy puntuales",
      loyverseId: "CUST_004",
      rewardPoints: 180,
      vipStatus: false,
      lastWhatsApp: "2025-07-26",
      satisfaction: 4,
      beforeAfterPhotos: 2
    }
  ]);

  const [appointments, setAppointments] = useState([
    { id: 1, clientName: "Ana García", area: "Piernas Completas", date: "2025-08-15", time: "10:00", status: "Confirmada", loyverseSync: true },
    { id: 2, clientName: "María López", area: "Brazos", date: "2025-08-20", time: "14:30", status: "Pendiente", loyverseSync: false },
    { id: 3, clientName: "Sofia Hernández", area: "Axilas", date: "2025-08-22", time: "16:00", status: "Confirmada", loyverseSync: true }
  ]);

  const [whatsappMessages, setWhatsappMessages] = useState([
    { id: 1, clientName: "Ana García", type: "Recordatorio", sent: "2025-07-27 09:00", status: "Leído" },
    { id: 2, clientName: "María López", type: "Tips post-sesión", sent: "2025-07-26 16:30", status: "Leído" },
    { id: 3, clientName: "Carmen Ruiz", type: "Satisfacción", sent: "2025-07-25 18:00", status: "Respondido" }
  ]);

  const [newMember, setNewMember] = useState({
    name: '', phone: '', email: '', membershipType: '', area: '', depositPaid: 0, referredBy: ''
  });

  const [showNewMemberForm, setShowNewMemberForm] = useState(false);
  const [showLoyverseSync, setShowLoyverseSync] = useState(false);

  // Estadísticas del dashboard
  const totalMembers = members.length;
  const activeMembers = members.filter(m => m.status === 'Activa').length;
  const monthlyRevenue = members.filter(m => m.status === 'Activa').reduce((sum, m) => sum + m.monthlyPayment, 0);
  const guaranteeRate = ((members.filter(m => m.satisfaction >= 4).length / totalMembers) * 100).toFixed(1);
  const vipMembers = members.filter(m => m.vipStatus).length;
  const totalRewardPoints = members.reduce((sum, m) => sum + m.rewardPoints, 0);

  const syncWithLoyverse = () => {
    setLastSync(new Date().toLocaleString());
    // Simular sincronización
    alert('Sincronización con Loyverse completada exitosamente');
  };

  const addNewMember = () => {
    if (newMember.name && newMember.phone && newMember.membershipType) {
      const membershipTypes = {
        'Básica (6 meses)': { sessions: 6, monthly: 800 },
        'Estándar (8 meses)': { sessions: 8, monthly: 750 },
        'Premium (12 meses)': { sessions: 12, monthly: 700 },
        'Familiar Premium': { sessions: 8, monthly: 1200 }
      };

      const typeInfo = membershipTypes[newMember.membershipType];
      
      const member = {
        id: members.length + 1,
        ...newMember,
        sessionsCompleted: 0,
        totalSessions: typeInfo.sessions,
        monthlyPayment: typeInfo.monthly,
        nextAppointment: "Por agendar",
        status: "Activa",
        startDate: new Date().toISOString().split('T')[0],
        progress: 0,
        loyverseId: `CUST_00${members.length + 1}`,
        rewardPoints: 50, // Puntos de bienvenida
        vipStatus: false,
        lastWhatsApp: "",
        satisfaction: 0,
        beforeAfterPhotos: 0
      };
      
      setMembers([...members, member]);
      setNewMember({ name: '', phone: '', email: '', membershipType: '', area: '', depositPaid: 0, referredBy: '' });
      setShowNewMemberForm(false);
    }
  };

  const Dashboard = () => (
    <div className="space-y-6">
      {/* Loyverse Connection Status */}
      <div className={`p-4 rounded-lg border-l-4 ${loyverseConnected ? 'bg-green-50 border-green-400' : 'bg-red-50 border-red-400'}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Wifi className={`h-5 w-5 ${loyverseConnected ? 'text-green-600' : 'text-red-600'}`} />
            <div>
              <p className={`font-medium ${loyverseConnected ? 'text-green-800' : 'text-red-800'}`}>
                Loyverse POS {loyverseConnected ? 'Conectado' : 'Desconectado'}
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
                <div className="flex items-center space-x-2">
                  {apt.loyverseSync && <Wifi className="h-4 w-4 text-green-500" />}
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    apt.status === 'Confirmada' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {apt.status}
                  </span>
                </div>
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
            {whatsappMessages.map(msg => (
              <div key={msg.id} className="p-3 border rounded-lg hover:bg-gray-50">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-gray-800">{msg.clientName}</p>
                    <p className="text-sm text-gray-600">{msg.type}</p>
                    <p className="text-xs text-gray-500">{msg.sent}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    msg.status === 'Leído' ? 'bg-blue-100 text-blue-800' : 
                    msg.status === 'Respondido' ? 'bg-green-100 text-green-800' : 
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {msg.status}
                  </span>
                </div>
              </div>
            ))}
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
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Reseñas 5 estrellas</span>
                <span className="text-sm font-medium">8</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Fuentes de Referidos</h3>
          <div className="space-y-4">
            {[
              { source: 'Facebook Ads', count: 12, percentage: 40 },
              { source: 'Referidos de clientes', count: 8, percentage: 27 },
              { source: 'Google', count: 6, percentage: 20 },
              { source: 'Programa Padrinos', count: 4, percentage: 13 }
            ].map(item => (
              <div key={item.source} className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-700">{item.source}</span>
                  <span className="text-sm text-gray-600">{item.count} ({item.percentage}%)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-pink-400 to-pink-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">ROI por Membresía</h3>
          <div className="space-y-4">
            {[
              { type: 'Premium (12 meses)', revenue: 8400, cost: 2100, roi: 300 },
              { type: 'Estándar (8 meses)', revenue: 6000, cost: 1800, roi: 233 },
              { type: 'Básica (6 meses)', revenue: 4800, cost: 1500, roi: 220 },
              { type: 'Familiar Premium', revenue: 9600, cost: 2400, roi: 300 }
            ].map(item => (
              <div key={item.type} className="p-3 border rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-800">{item.type}</span>
                  <span className="text-green-600 font-bold">+{item.roi}%</span>
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  Ingresos: ${item.revenue.toLocaleString()} | Costos: ${item.cost.toLocaleString()}
                </div>
              </div>
            ))}
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Satisfacción</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Loyverse</th>
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
                      <div className="text-xs text-gray-400">Ref: {member.referredBy}</div>
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
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-4 w-4 ${i < member.satisfaction ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {member.lastWhatsApp && `WhatsApp: ${member.lastWhatsApp}`}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <Wifi className="h-4 w-4 text-green-500" />
                      <span className="text-xs text-gray-600">{member.loyverseId}</span>
                    </div>
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
                <option value="Familiar Premium">Familiar Premium - $1200/mes</option>
              </select>
              <input
                type="text"
                placeholder="Área de tratamiento"
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                value={newMember.area}
                onChange={(e) => setNewMember({...newMember, area: e.target.value})}
              />
              <select
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                value={newMember.referredBy}
                onChange={(e) => setNewMember({...newMember, referredBy: e.target.value})}
              >
                <option value="">¿Cómo nos conoció?</option>
                <option value="Facebook Ads">Facebook Ads</option>
                <option value="Google">Google</option>
                <option value="Instagram">Instagram</option>
                <option value="Referido">Referido de cliente</option>
                <option value="Programa Padrinos">Programa Padrinos</option>
                <option value="WhatsApp">WhatsApp</option>
                <option value="Volante">Volante/Flyer</option>
                <option value="Otro">Otro</option>
              </select>
              <input
                type="number"
                placeholder="Depósito pagado"
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                value={newMember.depositPaid}
                onChange={(e) => setNewMember({...newMember, depositPaid: parseInt(e.target.value) || 0})}
              />
              <div className="bg-pink-50 p-3 rounded-lg">
                <p className="text-sm text-pink-800">
                  <Gift className="h-4 w-4 inline mr-1" />
                  ¡Recibirá 50 puntos de bienvenida automáticamente!
                </p>
              </div>
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
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" defaultChecked />
                  <span className="text-sm">Sincronizar clientes nuevos</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" defaultChecked />
                  <span className="text-sm">Sincronizar pagos</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" defaultChecked />
                  <span className="text-sm">Sincronizar citas</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm">Sincronizar productos</span>
                </label>
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

  const CommunicationTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center space-x-2">
          <MessageCircle className="h-6 w-6" />
          <span>Comunicación Automatizada</span>
        </h2>
        <button className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-lg hover:from-green-600 hover:to-green-700 flex items-center space-x-2">
          <Plus className="h-5 w-5" />
          <span>Nueva Campaña</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <div className="flex items-center space-x-2">
            <Bell className="h-5 w-5 text-blue-600" />
            <span className="font-medium text-blue-800">Recordatorios</span>
          </div>
          <p className="text-2xl font-bold text-blue-900 mt-2">12</p>
          <p className="text-sm text-blue-600">enviados hoy</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <div className="flex items-center space-x-2">
            <Heart className="h-5 w-5 text-green-600" />
            <span className="font-medium text-green-800">Tips Post-Sesión</span>
          </div>
          <p className="text-2xl font-bold text-green-900 mt-2">8</p>
          <p className="text-sm text-green-600">enviados hoy</p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
          <div className="flex items-center space-x-2">
            <Star className="h-5 w-5 text-purple-600" />
            <span className="font-medium text-purple-800">Satisfacción</span>
          </div>
          <p className="text-2xl font-bold text-purple-900 mt-2">5</p>
          <p className="text-sm text-purple-600">respuestas hoy</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Mensajes Automatizados</h3>
          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium">Recordatorio de Cita</h4>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Activo</span>
              </div>
              <p className="text-sm text-gray-600 mb-2">
                "¡Hola [NOMBRE]! 👋 Te recordamos tu cita en Dermasilk® mañana a las [HORA]. ¿Podrías confirmar tu asistencia? 💕"
              </p>
              <p className="text-xs text-gray-500">Envío: 24 horas antes</p>
            </div>
            
            <div className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium">Tips Post-Sesión</h4>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Activo</span>
              </div>
              <p className="text-sm text-gray-600 mb-2">
                "¡Hola [NOMBRE]! ✨ Gracias por visitarnos. Recuerda: evita el sol directo 48hrs, usa protector solar y mantén la zona hidratada. ¡Ya puedes ver los resultados! 🌟"
              </p>
              <p className="text-xs text-gray-500">Envío: 2 horas después de la sesión</p>
            </div>

            <div className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium">Encuesta de Satisfacción</h4>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Activo</span>
              </div>
              <p className="text-sm text-gray-600 mb-2">
                "¡Hola [NOMBRE]! 💕 ¿Cómo calificarías tu experiencia en Dermasilk® del 1 al 5? Tu opinión nos ayuda a mejorar. ⭐⭐⭐⭐⭐"
              </p>
              <p className="text-xs text-gray-500">Envío: 1 semana después de la sesión</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Historial de Mensajes</h3>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {whatsappMessages.map(msg => (
              <div key={msg.id} className="border rounded-lg p-3">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-gray-800">{msg.clientName}</p>
                    <p className="text-sm text-gray-600">{msg.type}</p>
                    <p className="text-xs text-gray-500">{msg.sent}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    msg.status === 'Leído' ? 'bg-blue-100 text-blue-800' : 
                    msg.status === 'Respondido' ? 'bg-green-100 text-green-800' : 
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {msg.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const RewardsTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center space-x-2">
          <Gift className="h-6 w-6" />
          <span>Sistema de Recompensas Dermasilk®</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-100 text-sm">Puntos Totales</p>
              <p className="text-3xl font-bold">{totalRewardPoints.toLocaleString()}</p>
            </div>
            <Gift className="h-12 w-12 text-yellow-200" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">Miembros VIP</p>
              <p className="text-3xl font-bold">{vipMembers}</p>
            </div>
            <Award className="h-12 w-12 text-purple-200" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Referidos</p>
              <p className="text-3xl font-bold">15</p>
            </div>
            <Users className="h-12 w-12 text-green-200" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-pink-500 to-pink-600 text-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-pink-100 text-sm">Fotos B&A</p>
              <p className="text-3xl font-bold">28</p>
            </div>
            <Camera className="h-12 w-12 text-pink-200" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Reglas de Puntos</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 border rounded-lg">
              <div>
                <p className="font-medium">Asistir puntual a cita</p>
                <p className="text-sm text-gray-600">Llegar a tiempo a la sesión</p>
              </div>
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">+10 pts</span>
            </div>
            <div className="flex justify-between items-center p-3 border rounded-lg">
              <div>
                <p className="font-medium">Referir un amigo</p>
                <p className="text-sm text-gray-600">Cuando el referido firma membresía</p>
              </div>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">+50 pts</span>
            </div>
            <div className="flex justify-between items-center p-3 border rounded-lg">
              <div>
                <p className="font-medium">Dejar reseña 5 estrellas</p>
                <p className="text-sm text-gray-600">En Google o Facebook</p>
              </div>
              <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">+25 pts</span>
            </div>
            <div className="flex justify-between items-center p-3 border rounded-lg">
              <div>
                <p className="font-medium">Autorizar foto antes/después</p>
                <p className="text-sm text-gray-600">Para redes sociales</p>
              </div>
              <span className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm font-medium">+20 pts</span>
            </div>
            <div className="flex justify-between items-center p-3 border rounded-lg">
              <div>
                <p className="font-medium">Completar membresía</p>
                <p className="text-sm text-gray-600">Terminar todas las sesiones</p>
              </div>
              <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">+100 pts</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Catálogo de Recompensas</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 border rounded-lg">
              <div>
                <p className="font-medium">Descuento 10% próxima zona</p>
                <p className="text-sm text-gray-600">Válido por 6 meses</p>
              </div>
              <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">100 pts</span>
            </div>
            <div className="flex justify-between items-center p-3 border rounded-lg">
              <div>
                <p className="font-medium">Sesión de retoque gratis</p>
                <p className="text-sm text-gray-600">En zona ya tratada</p>
              </div>
              <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">150 pts</span>
            </div>
            <div className="flex justify-between items-center p-3 border rounded-lg">
              <div>
                <p className="font-medium">Kit de cuidado post-depilación</p>
                <p className="text-sm text-gray-600">Cremas y productos especializados</p>
              </div>
              <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">75 pts</span>
            </div>
            <div className="flex justify-between items-center p-3 border rounded-lg bg-yellow-50 border-yellow-200">
              <div>
                <p className="font-medium">STATUS VIP</p>
                <p className="text-sm text-gray-600">Acceso a horarios especiales + descuentos de por vida</p>
              </div>
              <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">300 pts</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Top Clientes con Más Puntos</h3>
        <div className="space-y-3">
          {members
            .sort((a, b) => b.rewardPoints - a.rewardPoints)
            .slice(0, 5)
            .map((member, index) => (
              <div key={member.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                    index === 0 ? 'bg-yellow-500' : 
                    index === 1 ? 'bg-gray-400' : 
                    index === 2 ? 'bg-yellow-600' : 'bg-gray-300'
                  }`}>
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium">{member.name}</p>
                    <p className="text-sm text-gray-600">{member.area}</p>
                  </div>
                  {member.vipStatus && <Award className="h-5 w-5 text-yellow-500" />}
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg">{member.rewardPoints}</p>
                  <p className="text-sm text-gray-600">puntos</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );

  const AppointmentsTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Gestión de Citas</h2>
        <button className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-lg hover:from-green-600 hover:to-green-700 flex items-center space-x-2">
          <Calendar className="h-5 w-5" />
          <span>Nueva Cita</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <div className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-blue-600" />
            <span className="font-medium text-blue-800">Hoy</span>
          </div>
          <p className="text-2xl font-bold text-blue-900 mt-2">3</p>
          <p className="text-sm text-blue-600">citas programadas</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <span className="font-medium text-green-800">Esta Semana</span>
          </div>
          <p className="text-2xl font-bold text-green-900 mt-2">12</p>
          <p className="text-sm text-green-600">citas programadas</p>
        </div>
        <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
          <div className="flex items-center space-x-2">
            <Clock className="h-5 w-5 text-orange-600" />
            <span className="font-medium text-orange-800">Pendientes</span>
          </div>
          <p className="text-2xl font-bold text-orange-900 mt-2">2</p>
          <p className="text-sm text-orange-600">confirmaciones</p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
          <div className="flex items-center space-x-2">
            <Wifi className="h-5 w-5 text-purple-600" />
            <span className="font-medium text-purple-800">Sync Loyverse</span>
          </div>
          <p className="text-2xl font-bold text-purple-900 mt-2">98%</p>
          <p className="text-sm text-purple-600">sincronizadas</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Área</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hora</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Loyverse</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {appointments.map(appointment => (
                <tr key={appointment.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{appointment.clientName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{appointment.area}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{appointment.date}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{appointment.time}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      appointment.status === 'Confirmada' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {appointment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-1">
                      <Wifi className={`h-4 w-4 ${appointment.loyverseSync ? 'text-green-500' : 'text-red-500'}`} />
                      <span className="text-xs text-gray-600">
                        {appointment.loyverseSync ? 'Sync' : 'Pendiente'}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button className="text-blue-600 hover:text-blue-900">Editar</button>
                    <button className="text-green-600 hover:text-green-900">Confirmar</button>
                    <button className="text-purple-600 hover:text-purple-900">WhatsApp</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const ReportsTab = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 flex items-center space-x-2">
        <TrendingUp className="h-6 w-6" />
        <span>Reportes y Análisis Dermasilk®</span>
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Ingresos vs Loyverse</h3>
          <div className="space-y-3">
            {['Julio 2025', 'Junio 2025', 'Mayo 2025'].map((month, index) => {
              const membershipRevenue = [28500, 25200, 22800][index];
              const loyverseRevenue = [5200, 4800, 4200][index];
              const total = membershipRevenue + loyverseRevenue;
              return (
                <div key={month} className="border rounded-lg p-3">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-gray-700">{month}</span>
                    <span className="text-green-600 font-bold">${total.toLocaleString()}</span>
                  </div>
                  <div className="text-sm space-y-1">
                    <div className="flex justify-between">
                      <span className="text-pink-600">Membresías: ${membershipRevenue.toLocaleString()}</span>
                      <span className="text-blue-600">Productos: ${loyverseRevenue.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Conversión por Canal</h3>
          <div className="space-y-3">
            {[
              { channel: 'Facebook Ads', leads: 45, conversions: 12, rate: 26.7 },
              { channel: 'Referidos', leads: 20, conversions: 8, rate: 40.0 },
              { channel: 'Google', leads: 30, conversions: 6, rate: 20.0 },
              { channel: 'Programa Padrinos', leads: 15, conversions: 4, rate: 26.7 }
            ].map(item => (
              <div key={item.channel} className="border rounded-lg p-3">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-700">{item.channel}</span>
                  <span className="text-green-600 font-bold">{item.rate.toFixed(1)}%</span>
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  {item.conversions} conversiones de {item.leads} leads
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Proyección Anual</h3>
          <div className="space-y-3">
            <div className="p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="text-lg font-bold text-green-800">$420,000</div>
              <div className="text-sm text-green-600">Ingresos proyectados</div>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div className="text-lg font-bold text-blue-800">180</div>
              <div className="text-sm text-blue-600">Nuevos miembros meta</div>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
              <div className="text-lg font-bold text-purple-800">+65%</div>
              <div className="text-sm text-purple-600">Crecimiento esperado</div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Comparativa Loyverse</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 border rounded-lg">
              <span className="text-sm">Ventas productos</span>
              <span className="font-bold text-blue-600">$14,200</span>
            </div>
            <div className="flex justify-between items-center p-3 border rounded-lg">
              <span className="text-sm">Membresías nuevas</span>
              <span className="font-bold text-pink-600">$28,500</span>
            </div>
            <div className="flex justify-between items-center p-3 border rounded-lg bg-green-50">
              <span className="text-sm font-medium">Total integrado</span>
              <span className="font-bold text-green-600">$42,700</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
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
              </div>
              <div className="bg-gradient-to-r from-green-400 to-green-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                FDA APROBADO
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'dashboard', name: 'Dashboard', icon: Star },
              { id: 'members', name: 'Miembros', icon: Users },
              { id: 'appointments', name: 'Citas', icon: Calendar },
              { id: 'communication', name: 'WhatsApp', icon: MessageCircle },
              { id: 'rewards', name: 'Recompensas', icon: Gift },
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

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'members' && <MembersTab />}
        {activeTab === 'appointments' && <AppointmentsTab />}
        {activeTab === 'communication' && <CommunicationTab />}
        {activeTab === 'rewards' && <RewardsTab />}
        {activeTab === 'reports' && <ReportsTab />}
      </div>
    </div>
  );
};

export default DermasilkMembershipSystem;
