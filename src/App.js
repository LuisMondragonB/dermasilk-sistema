import React, { useState } from 'react';
import { Calendar, Plus, User, Clock, MapPin, Phone, Mail, Search, Filter } from 'lucide-react';

function App() {
  const [showNewAppointmentModal, setShowNewAppointmentModal] = useState(false);
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      clientName: 'María González',
      phone: '+34 666 123 456',
      email: 'maria.gonzalez@email.com',
      service: 'Depilación Láser - Piernas Completas',
      date: '2024-01-15',
      time: '10:00',
      status: 'confirmada',
      session: 3,
      totalSessions: 8,
      notes: 'Cliente regular, piel sensible'
    },
    {
      id: 2,
      clientName: 'Ana Martín',
      phone: '+34 677 987 654',
      email: 'ana.martin@email.com',
      service: 'Depilación Láser - Axilas',
      date: '2024-01-15',
      time: '11:30',
      status: 'pendiente',
      session: 1,
      totalSessions: 6,
      notes: 'Primera sesión, realizar prueba de sensibilidad'
    }
  ]);

  const [newAppointment, setNewAppointment] = useState({
    clientName: '',
    phone: '',
    email: '',
    service: '',
    date: '',
    time: '',
    session: 1,
    totalSessions: 6,
    notes: ''
  });

  const laserServices = [
    { name: 'Depilación Láser - Piernas Completas', sessions: 8, duration: 90 },
    { name: 'Depilación Láser - Media Pierna', sessions: 8, duration: 60 },
    { name: 'Depilación Láser - Axilas', sessions: 6, duration: 30 },
    { name: 'Depilación Láser - Ingles', sessions: 8, duration: 45 },
    { name: 'Depilación Láser - Brazos Completos', sessions: 8, duration: 75 },
    { name: 'Depilación Láser - Labio Superior', sessions: 6, duration: 15 },
    { name: 'Depilación Láser - Mentón', sessions: 6, duration: 20 },
    { name: 'Depilación Láser - Espalda', sessions: 8, duration: 60 }
  ];

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '16:00', '16:30',
    '17:00', '17:30', '18:00', '18:30', '19:00', '19:30'
  ];

  const handleNewAppointment = () => {
    setShowNewAppointmentModal(true);
  };

  const handleSaveAppointment = () => {
    if (!newAppointment.clientName || !newAppointment.service || !newAppointment.date || !newAppointment.time) {
      alert('Por favor, completa todos los campos obligatorios');
      return;
    }

    const selectedService = laserServices.find(s => s.name === newAppointment.service);
    
    const appointment = {
      id: appointments.length + 1,
      ...newAppointment,
      status: 'confirmada',
      totalSessions: selectedService ? selectedService.sessions : 6
    };

    setAppointments([...appointments, appointment]);
    setNewAppointment({
      clientName: '',
      phone: '',
      email: '',
      service: '',
      date: '',
      time: '',
      session: 1,
      totalSessions: 6,
      notes: ''
    });
    setShowNewAppointmentModal(false);
  };

  const handleServiceChange = (serviceName) => {
    const selectedService = laserServices.find(s => s.name === serviceName);
    setNewAppointment({
      ...newAppointment,
      service: serviceName,
      totalSessions: selectedService ? selectedService.sessions : 6
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmada': return 'bg-green-100 text-green-800';
      case 'pendiente': return 'bg-yellow-100 text-yellow-800';
      case 'completada': return 'bg-blue-100 text-blue-800';
      case 'cancelada': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dermasilk®</h1>
              <p className="text-gray-600 mt-1">Sistema de Gestión de Citas - Depilación Láser</p>
            </div>
            <button 
              onClick={handleNewAppointment}
              className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-lg hover:from-green-600 hover:to-green-700 flex items-center space-x-2 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Plus className="w-5 h-5" />
              <span>Nueva Cita</span>
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Citas Hoy</p>
                  <p className="text-2xl font-bold text-gray-900">{appointments.length}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <User className="w-6 h-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Clientes Activos</p>
                  <p className="text-2xl font-bold text-gray-900">24</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Clock className="w-6 h-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Sesiones Completadas</p>
                  <p className="text-2xl font-bold text-gray-900">156</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <MapPin className="w-6 h-6 text-orange-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Tratamientos</p>
                  <p className="text-2xl font-bold text-gray-900">8</p>
                </div>
              </div>
            </div>
          </div>

          {/* Appointments List */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="px-6 py-4 border-b border-gray-100">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">Citas Programadas</h2>
                <div className="flex space-x-2">
                  <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                    <Search className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                    <Filter className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
            
            <div className="divide-y divide-gray-100">
              {appointments.map((appointment) => (
                <div key={appointment.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                            <User className="w-6 h-6 text-white" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-3">
                            <h3 className="text-lg font-semibold text-gray-900">{appointment.clientName}</h3>
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(appointment.status)}`}>
                              {appointment.status}
                            </span>
                          </div>
                          <div className="mt-1 flex items-center space-x-4 text-sm text-gray-500">
                            <span className="flex items-center">
                              <Phone className="w-4 h-4 mr-1" />
                              {appointment.phone}
                            </span>
                            <span className="flex items-center">
                              <Mail className="w-4 h-4 mr-1" />
                              {appointment.email}
                            </span>
                          </div>
                          <div className="mt-2">
                            <p className="text-sm font-medium text-gray-900">{appointment.service}</p>
                            <p className="text-sm text-gray-500">
                              Sesión {appointment.session} de {appointment.totalSessions}
                            </p>
                          </div>
                          {appointment.notes && (
                            <p className="mt-2 text-sm text-gray-600 italic">{appointment.notes}</p>
                          )}
                        </div>
                        <div className="flex-shrink-0 text-right">
                          <div className="flex items-center text-sm text-gray-500 mb-1">
                            <Calendar className="w-4 h-4 mr-1" />
                            {formatDate(appointment.date)}
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <Clock className="w-4 h-4 mr-1" />
                            {appointment.time}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* New Appointment Modal */}
      {showNewAppointmentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-100">
              <h3 className="text-xl font-semibold text-gray-900">Nueva Cita - Depilación Láser</h3>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre del Cliente *
                  </label>
                  <input
                    type="text"
                    value={newAppointment.clientName}
                    onChange={(e) => setNewAppointment({...newAppointment, clientName: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Nombre completo"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    value={newAppointment.phone}
                    onChange={(e) => setNewAppointment({...newAppointment, phone: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="+34 666 123 456"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={newAppointment.email}
                    onChange={(e) => setNewAppointment({...newAppointment, email: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="cliente@email.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tratamiento *
                  </label>
                  <select
                    value={newAppointment.service}
                    onChange={(e) => handleServiceChange(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">Seleccionar tratamiento</option>
                    {laserServices.map((service) => (
                      <option key={service.name} value={service.name}>
                        {service.name} ({service.sessions} sesiones)
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fecha *
                  </label>
                  <input
                    type="date"
                    value={newAppointment.date}
                    onChange={(e) => setNewAppointment({...newAppointment, date: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Hora *
                  </label>
                  <select
                    value={newAppointment.time}
                    onChange={(e) => setNewAppointment({...newAppointment, time: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">Seleccionar hora</option>
                    {timeSlots.map((time) => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Número de Sesión
                  </label>
                  <input
                    type="number"
                    min="1"
                    max={newAppointment.totalSessions}
                    value={newAppointment.session}
                    onChange={(e) => setNewAppointment({...newAppointment, session: parseInt(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Total de Sesiones
                  </label>
                  <input
                    type="number"
                    value={newAppointment.totalSessions}
                    readOnly
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Notas Adicionales
                </label>
                <textarea
                  value={newAppointment.notes}
                  onChange={(e) => setNewAppointment({...newAppointment, notes: e.target.value})}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Observaciones, alergias, tipo de piel, etc."
                />
              </div>
            </div>
            
            <div className="px-6 py-4 border-t border-gray-100 flex justify-end space-x-3">
              <button
                onClick={() => setShowNewAppointmentModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveAppointment}
                className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200"
              >
                Guardar Cita
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;