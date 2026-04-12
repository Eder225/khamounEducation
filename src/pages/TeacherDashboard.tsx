import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { AuthContext } from '../contexts/AuthContext';
import { 
  Users, 
  LogOut, 
  BookOpen,
  MessageSquare,
  FileText,
  Bell,
  Plus,
  Search,
  Settings,
  X,
  Upload
} from 'lucide-react';
import { Logo } from '../components/Logo';

const TEACHER_CLASSES = ['Terminale C', 'Première D', 'Troisième A', 'Seconde C'];

interface Student {
  id: string;
  name: string;
  className: string;
  average: string;
  progress: number;
}

interface Assignment {
  id: string;
  title: string;
  className: string;
  dueDate: string;
  type: 'devoir' | 'quiz' | 'cours';
  submitted: number;
  total: number;
  content?: string;
  fileName?: string;
  fileType?: 'pdf' | 'image' | 'video';
}

interface Message {
  id: string;
  content: string;
  time: string;
  isMe: boolean;
}

interface Conversation {
  id: string;
  name: string;
  role: string;
  lastMessageTime: string;
  messages: Message[];
}

export const TeacherDashboard = () => {
  const { user, isAuthReady } = useContext(AuthContext);
  const navigate = useNavigate();
  const [userData, setUserData] = useState<{ name?: string, role?: string } | null>(null);
  const [activeTab, setActiveTab] = useState('classes');

  // State for Students
  const [students, setStudents] = useState<Student[]>([
    { id: '1', name: 'Amadou Diallo', className: 'Terminale C', average: '16/20', progress: 80 },
    { id: '2', name: 'Marie Koné', className: 'Première D', average: '12/20', progress: 60 },
    { id: '3', name: 'Jean-Paul Kouassi', className: 'Terminale C', average: '08/20', progress: 30 },
  ]);
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const [newStudent, setNewStudent] = useState({ name: '', className: '', average: '', progress: 0 });

  // State for Assignments
  const [assignments, setAssignments] = useState<Assignment[]>([
    { id: '1', title: 'Devoir Maison : Étude de Fonctions', className: 'Terminale C', dueDate: '15 Avril 2026', type: 'devoir', submitted: 24, total: 32, content: 'Faire les exercices 1 à 4 page 120.', fileName: 'exercices_fonctions.pdf', fileType: 'pdf' },
    { id: '2', title: 'Quiz : Probabilités Conditionnelles', className: 'Première D', dueDate: '10 Avril 2026', type: 'quiz', submitted: 45, total: 45 },
    { id: '3', title: 'Support de cours : Limites', className: 'Terminale C', dueDate: '12 Avril 2026', type: 'cours', submitted: 0, total: 32, content: 'Veuillez lire le chapitre 4 et regarder la vidéo avant la prochaine session.', fileName: 'cours_limites.mp4', fileType: 'video' },
  ]);
  const [showAddAssignmentModal, setShowAddAssignmentModal] = useState(false);
  const [newAssignment, setNewAssignment] = useState<Partial<Assignment>>({ title: '', className: 'Terminale C', dueDate: '', type: 'devoir', submitted: 0, total: 30, content: '' });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // State for Messages
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: '1',
      name: 'Amadou Diallo',
      role: 'Élève • Terminale C',
      lastMessageTime: '10:42',
      messages: [
        { id: 'm1', content: "Bonjour Monsieur, j'ai une question sur l'exercice 4 du devoir maison. Je ne comprends pas comment appliquer le théorème des valeurs intermédiaires dans ce cas précis.", time: '10:42', isMe: false }
      ]
    },
    {
      id: '2',
      name: 'Classe Terminale C',
      role: 'Groupe Classe',
      lastMessageTime: 'Hier',
      messages: [
        { id: 'm1', content: "N'oubliez pas le devoir pour demain.", time: 'Hier', isMe: true }
      ]
    }
  ]);
  const [activeConversationId, setActiveConversationId] = useState<string>('1');
  const [newMessageText, setNewMessageText] = useState('');

  useEffect(() => {
    if (isAuthReady && !user) {
      navigate('/auth');
      return;
    }

    const fetchUserData = async () => {
      if (user) {
        try {
          const userDocRef = doc(db, 'users', user.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            const data = userDoc.data();
            setUserData({
              name: data.name as string,
              role: data.role as string
            });
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserData();
  }, [user, isAuthReady, navigate]);

  const handleLogout = async () => {
    await auth.signOut();
    navigate('/');
  };

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    setStudents([...students, { ...newStudent, id: Date.now().toString() } as Student]);
    setShowAddStudentModal(false);
    setNewStudent({ name: '', className: '', average: '', progress: 0 });
  };

  const handleAddAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    let formattedDate = newAssignment.dueDate;
    if (formattedDate && formattedDate.includes('-')) {
      const dateObj = new Date(formattedDate);
      formattedDate = dateObj.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
    }
    
    let fileType: 'pdf' | 'image' | 'video' | undefined = undefined;
    if (selectedFile) {
      if (selectedFile.type.includes('pdf')) fileType = 'pdf';
      else if (selectedFile.type.includes('image')) fileType = 'image';
      else if (selectedFile.type.includes('video')) fileType = 'video';
    }
    
    setAssignments([...assignments, { 
      ...newAssignment, 
      dueDate: formattedDate, 
      id: Date.now().toString(),
      fileName: selectedFile?.name,
      fileType: fileType
    } as Assignment]);
    setShowAddAssignmentModal(false);
    setNewAssignment({ title: '', className: TEACHER_CLASSES[0], dueDate: '', type: 'devoir', submitted: 0, total: 30, content: '' });
    setSelectedFile(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessageText.trim()) return;

    setConversations(conversations.map(conv => {
      if (conv.id === activeConversationId) {
        return {
          ...conv,
          lastMessageTime: 'À l\'instant',
          messages: [
            ...conv.messages,
            { id: Date.now().toString(), content: newMessageText, time: 'À l\'instant', isMe: true }
          ]
        };
      }
      return conv;
    }));
    setNewMessageText('');
  };

  const userName = userData?.name || 'Professeur';
  const userInitial = userName.charAt(0).toUpperCase();
  const activeConversation = conversations.find(c => c.id === activeConversationId);

  return (
    <div className="bg-slate-50 text-slate-900 font-sans overflow-hidden h-screen flex">
      {/* Sidebar Navigation */}
      <aside className="w-64 h-full bg-white flex flex-col z-50 border-r border-slate-200">
        <div className="p-6 mb-4 flex items-center justify-start border-b border-slate-100">
          <Logo className="h-10 w-auto object-contain cursor-pointer" onClick={() => navigate('/')} />
        </div>
        
        <nav className="flex-1 px-3 space-y-1">
          <div className="px-3 mb-2">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Menu Principal</p>
          </div>
          <button onClick={() => setActiveTab('classes')} className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'classes' ? 'text-khamoun-primary bg-khamoun-primary/5' : 'text-slate-500 hover:bg-slate-50'}`}>
            <BookOpen size={18} />
            <span>Tableau de Bord</span>
          </button>
          <button onClick={() => setActiveTab('students')} className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'students' ? 'text-khamoun-primary bg-khamoun-primary/5' : 'text-slate-500 hover:bg-slate-50'}`}>
            <Users size={18} />
            <span>Mes Élèves</span>
          </button>
          <button onClick={() => setActiveTab('contenus')} className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'contenus' ? 'text-khamoun-primary bg-khamoun-primary/5' : 'text-slate-500 hover:bg-slate-50'}`}>
            <FileText size={18} />
            <span>Cours & Devoirs</span>
          </button>
          <button onClick={() => setActiveTab('messages')} className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'messages' ? 'text-khamoun-primary bg-khamoun-primary/5' : 'text-slate-500 hover:bg-slate-50'}`}>
            <MessageSquare size={18} />
            <span>Messagerie</span>
          </button>
        </nav>
        
        <div className="p-4 border-t border-slate-100">
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2 text-slate-500 hover:text-red-500 hover:bg-red-50 transition-all rounded-lg text-sm font-bold">
            <LogOut size={18} />
            <span>Déconnexion</span>
          </button>
        </div>
      </aside>

      {/* Main Viewport */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="bg-white border-b border-slate-200 flex justify-between items-center w-full px-8 py-4 sticky top-0 z-40">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Espace Enseignant</h2>
            <p className="text-xs text-slate-500 font-medium tracking-tight">Gestion du programme et suivi pédagogique</p>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-400 hover:text-khamoun-primary transition-colors relative">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-khamoun-secondary rounded-full border-2 border-white"></span>
            </button>
            
            <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold text-slate-900">{userName}</p>
                <p className="text-[10px] text-slate-400 font-medium capitalize">{userData?.role || 'Professeur'}</p>
              </div>
              <div className="w-9 h-9 rounded-lg bg-khamoun-primary text-white flex items-center justify-center font-bold text-sm shadow-sm shadow-khamoun-primary/20">
                {userInitial}
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          {activeTab === 'classes' && (
            <div className="max-w-6xl mx-auto space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Total Élèves</p>
                  <p className="text-2xl font-bold text-slate-900">145</p>
                </div>
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">À Corriger</p>
                  <p className="text-2xl font-bold text-khamoun-secondary">12</p>
                </div>
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Moyenne Générale</p>
                  <p className="text-2xl font-bold text-khamoun-accent">13.5/20</p>
                </div>
                <button onClick={() => setShowAddAssignmentModal(true)} className="bg-khamoun-primary text-white p-5 rounded-xl shadow-lg hover:opacity-90 transition-opacity flex flex-col items-center justify-center gap-1">
                  <Plus size={20} />
                  <span className="text-xs font-bold">Nouveau Contenu</span>
                </button>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <div className="w-1.5 h-6 bg-khamoun-primary rounded-full"></div>
                  Vos Classes Actives
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-khamoun-primary transition-all group cursor-pointer shadow-sm">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <span className="text-[10px] font-bold text-khamoun-primary bg-khamoun-primary/10 px-2 py-1 rounded uppercase tracking-wider">Terminale C</span>
                        <h4 className="font-bold text-slate-900 text-lg mt-2 group-hover:text-khamoun-primary transition-colors">Mathématiques Avancées</h4>
                      </div>
                      <div className="flex -space-x-2">
                        {[1,2,3].map(i => <div key={i} className="w-8 h-8 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-slate-400 italic">U</div>)}
                        <div className="w-8 h-8 rounded-full bg-slate-800 text-white border-2 border-white flex items-center justify-center text-[10px] font-bold">+29</div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs text-slate-500 font-medium">Progression du programme</span>
                      <span className="text-xs font-bold text-khamoun-primary">65%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-khamoun-primary w-[65%] rounded-full transition-all duration-1000"></div>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-khamoun-secondary transition-all group cursor-pointer shadow-sm">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <span className="text-[10px] font-bold text-khamoun-secondary bg-khamoun-secondary/10 px-2 py-1 rounded uppercase tracking-wider">Première D</span>
                        <h4 className="font-bold text-slate-900 text-lg mt-2 group-hover:text-khamoun-secondary transition-colors">Mathématiques Générales</h4>
                      </div>
                      <div className="flex -space-x-2">
                        {[1,2,3].map(i => <div key={i} className="w-8 h-8 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-slate-400 italic">U</div>)}
                        <div className="w-8 h-8 rounded-full bg-slate-800 text-white border-2 border-white flex items-center justify-center text-[10px] font-bold">+42</div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs text-slate-500 font-medium">Progression du programme</span>
                      <span className="text-xs font-bold text-khamoun-secondary">40%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-khamoun-secondary w-[40%] rounded-full transition-all duration-1000"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'students' && (
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-xl text-slate-900 tracking-tight">Suivi des Élèves</h3>
                <div className="flex gap-2">
                  <div className="relative hidden md:block">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input type="text" placeholder="Rechercher..." className="pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-khamoun-primary" />
                  </div>
                  <button onClick={() => setShowAddStudentModal(true)} className="flex items-center gap-2 px-4 py-2 bg-khamoun-primary text-white rounded-lg text-sm font-bold hover:bg-khamoun-primary/90 transition-colors">
                    <Plus size={16} />
                    <span>Ajouter</span>
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 text-[11px] uppercase tracking-wider text-slate-400 font-bold">
                      <th className="pb-4">Nom de l'élève</th>
                      <th className="pb-4">Classe</th>
                      <th className="pb-4">Moyenne</th>
                      <th className="pb-4">Progression</th>
                      <th className="pb-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {students.map(student => (
                      <tr key={student.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                        <td className="py-4 font-bold text-slate-800">{student.name}</td>
                        <td className="py-4 text-slate-500">{student.className}</td>
                        <td className={`py-4 font-bold ${parseFloat(student.average) >= 12 ? 'text-khamoun-accent' : 'text-khamoun-secondary'}`}>{student.average}</td>
                        <td className="py-4">
                          <div className="flex items-center gap-2">
                            <div className="h-1.5 w-24 bg-slate-100 rounded-full overflow-hidden">
                              <div className={`h-full rounded-full ${student.progress >= 70 ? 'bg-khamoun-accent' : 'bg-khamoun-secondary'}`} style={{ width: `${student.progress}%` }}></div>
                            </div>
                            <span className="text-[10px] font-bold text-slate-400">{student.progress}%</span>
                          </div>
                        </td>
                        <td className="py-4 text-right">
                          <button className="text-khamoun-primary hover:underline text-xs font-bold">Détails</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'contenus' && (
            <div className="space-y-6">
              <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="font-bold text-xl text-slate-900 tracking-tight">Cours & Devoirs</h3>
                  <button onClick={() => setShowAddAssignmentModal(true)} className="flex items-center gap-2 px-4 py-2 bg-khamoun-primary text-white rounded-lg text-sm font-bold hover:bg-khamoun-primary/90 transition-colors">
                    <Plus size={16} />
                    <span>Nouveau Contenu</span>
                  </button>
                </div>
                <div className="grid gap-4">
                  {assignments.map(assignment => (
                    <div key={assignment.id} className="p-5 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${assignment.type === 'cours' ? 'bg-khamoun-accent/10 text-khamoun-accent' : 'bg-khamoun-primary/10 text-khamoun-primary'}`}>
                          {assignment.type === 'cours' ? <BookOpen size={18} /> : <FileText size={18} />}
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-800 text-sm">{assignment.title}</h4>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">{assignment.className} • {assignment.dueDate}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right mr-4">
                          <p className="text-sm font-bold text-slate-800">{assignment.submitted}/{assignment.total}</p>
                          <p className="text-[10px] text-slate-400 font-bold uppercase">Rendus</p>
                        </div>
                        <button className="px-4 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:border-khamoun-primary hover:text-khamoun-primary transition-all">Gérer</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'messages' && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm h-[600px] flex overflow-hidden">
              <div className="w-80 border-r border-slate-100 flex flex-col">
                <div className="p-4 border-b border-slate-50">
                  <h3 className="font-bold text-slate-900 mb-4">Messages</h3>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                    <input type="text" placeholder="Rechercher..." className="w-full pl-8 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-lg text-xs focus:outline-none focus:border-khamoun-primary" />
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto">
                  {conversations.map(conv => (
                    <div key={conv.id} onClick={() => setActiveConversationId(conv.id)} className={`p-4 border-b border-slate-50 cursor-pointer transition-all ${activeConversationId === conv.id ? 'bg-khamoun-primary/5 border-l-4 border-l-khamoun-primary' : 'hover:bg-slate-50'}`}>
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-bold text-slate-800 text-xs">{conv.name}</h4>
                        <span className="text-[10px] text-slate-400">{conv.lastMessageTime}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 truncate">{conv.messages[conv.messages.length-1].content}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex-1 flex flex-col bg-slate-50/30">
                {activeConversation ? (
                  <>
                    <div className="p-4 bg-white border-b border-slate-100 flex justify-between items-center">
                      <div>
                        <h3 className="font-bold text-sm text-slate-900">{activeConversation.name}</h3>
                        <p className="text-[10px] text-slate-400 font-bold uppercase">{activeConversation.role}</p>
                      </div>
                      <Settings size={16} className="text-slate-400" />
                    </div>
                    <div className="flex-1 p-6 overflow-y-auto flex flex-col gap-4">
                      {activeConversation.messages.map(msg => (
                        <div key={msg.id} className={`max-w-[70%] p-3 rounded-2xl text-xs shadow-sm ${msg.isMe ? 'self-end bg-khamoun-primary text-white rounded-tr-none' : 'self-start bg-white text-slate-700 rounded-tl-none border border-slate-100'}`}>
                          {msg.content}
                        </div>
                      ))}
                    </div>
                    <div className="p-4 bg-white border-t border-slate-100">
                      <form onSubmit={handleSendMessage} className="flex gap-2">
                        <input type="text" value={newMessageText} onChange={e => setNewMessageText(e.target.value)} placeholder="Votre message..." className="flex-1 px-4 py-2 bg-slate-50 border border-slate-100 rounded-lg text-xs focus:outline-none focus:border-khamoun-primary" />
                        <button type="submit" className="px-4 py-2 bg-khamoun-primary text-white rounded-lg text-xs font-bold hover:opacity-90 transition-opacity">Envoyer</button>
                      </form>
                    </div>
                  </>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center text-slate-300">
                    <MessageSquare size={48} className="mb-4 opacity-20" />
                    <p className="text-sm font-bold">Sélectionnez une conversation</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Modals */}
        {showAddStudentModal && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
              <div className="p-6 border-b border-slate-50 flex justify-between items-center">
                <h3 className="font-bold text-lg text-slate-900">Ajouter un élève</h3>
                <X size={20} className="text-slate-400 cursor-pointer" onClick={() => setShowAddStudentModal(false)} />
              </div>
              <form onSubmit={handleAddStudent} className="p-6 space-y-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Nom complet</label>
                  <input type="text" required value={newStudent.name} onChange={e => setNewStudent({...newStudent, name: e.target.value})} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-khamoun-primary" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Classe</label>
                  <input type="text" required value={newStudent.className} onChange={e => setNewStudent({...newStudent, className: e.target.value})} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-khamoun-primary" />
                </div>
                <div className="flex justify-end gap-3 mt-6">
                  <button type="button" onClick={() => setShowAddStudentModal(false)} className="px-4 py-2 text-sm font-bold text-slate-500 hover:text-slate-700">Annuler</button>
                  <button type="submit" className="px-6 py-2 bg-khamoun-primary text-white rounded-lg text-sm font-bold shadow-lg shadow-khamoun-primary/20">Ajouter</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {showAddAssignmentModal && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
              <div className="p-6 border-b border-slate-50 flex justify-between items-center">
                <h3 className="font-bold text-lg text-slate-900">Nouveau Contenu</h3>
                <X size={20} className="text-slate-400 cursor-pointer" onClick={() => setShowAddAssignmentModal(false)} />
              </div>
              <form onSubmit={handleAddAssignment} className="p-6 space-y-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Titre</label>
                  <input type="text" required value={newAssignment.title} onChange={e => setNewAssignment({...newAssignment, title: e.target.value})} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-khamoun-primary" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Classe</label>
                  <select required value={newAssignment.className} onChange={e => setNewAssignment({...newAssignment, className: e.target.value})} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-khamoun-primary">
                    {TEACHER_CLASSES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Type</label>
                    <select value={newAssignment.type} onChange={e => setNewAssignment({...newAssignment, type: e.target.value as 'devoir' | 'quiz' | 'cours'})} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-khamoun-primary">
                      <option value="cours">Cours</option>
                      <option value="devoir">Devoir</option>
                      <option value="quiz">Quiz</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Date</label>
                    <input type="date" required value={newAssignment.dueDate} onChange={e => setNewAssignment({...newAssignment, dueDate: e.target.value})} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-khamoun-primary" />
                  </div>
                </div>
                <div className="mt-4 p-4 border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center gap-2 bg-slate-50">
                  <Upload size={24} className="text-slate-400" />
                  <label className="cursor-pointer text-xs font-bold text-khamoun-primary hover:underline">
                    Joindre un fichier (PDF, MP4, JPG)
                    <input type="file" className="hidden" onChange={handleFileChange} />
                  </label>
                  {selectedFile && <p className="text-[10px] font-bold text-slate-500">{selectedFile.name}</p>}
                </div>
                <div className="flex justify-end gap-3 mt-6">
                  <button type="button" onClick={() => setShowAddAssignmentModal(false)} className="px-4 py-2 text-sm font-bold text-slate-500 hover:text-slate-700">Annuler</button>
                  <button type="submit" className="px-6 py-2 bg-khamoun-primary text-white rounded-lg text-sm font-bold shadow-lg shadow-khamoun-primary/20">Créer</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default TeacherDashboard;
