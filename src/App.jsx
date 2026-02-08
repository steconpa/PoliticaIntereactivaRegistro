import React, { useState, useEffect } from 'react';
import {
    ChevronRight,
    ChevronLeft,
    CheckCircle,
    AlertCircle,
    BookOpen,
    ClipboardCheck,
    PenTool,
    RotateCcw,
    Hash,
    Copy,
    RefreshCcw,
    ShieldCheck
} from 'lucide-react';

const App = () => {
    // --- CONFIGURACIÓN DE VINCULACIÓN ---
    const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbyjrdln7TzKaFJFTVH7zcPQg87ZtNPL0BOzkmbd1EqH31eQiJGSQr7N5C2ytpMUYxfZ/exec";

    const contentData = {
        titulo: "Política de Uso Seguro de Cuentas Personales de Google",
        subtitulo: "Técnico Laboral en Sistemas",
        secciones: [
            { id: 0, titulo: "1. Propósito del Anexo", contenido: ["Garantizar claridad operativa en el uso de cuentas personales.", "Reducir riesgos de pérdida de información.", "Proteger la privacidad básica de los estudiantes.", "Establecer responsabilidades individuales.", "Aclarar que la infraestructura utilizada no es institucional."] },
            { id: 1, titulo: "2. Alcance", contenido: ["Estudiantes matriculados en el programa.", "Docente responsable del módulo.", "Actividades realizadas en Drive, Docs, Sheets, Forms, Sites, AppSheet y Classroom.", "No aplica a procesos administrativos del CESP."] },
            { id: 2, titulo: "3. Naturaleza de las cuentas", bloques: [{ subtitulo: "3.1 Cuentas personales", contenido: ["Crear documentos académicos.", "Entregar actividades.", "Acceder a Classroom."] }, { subtitulo: "3.2 No institucionalidad", contenido: ["Las cuentas no pertenecen al CESP.", "No existe Workspace institucional."] }] },
            { id: 3, titulo: "4. Información Permitida vs No Permitida", tipo: "comparativa", permitida: ["Actividades académicas.", "Documentos del curso.", "Prototipos."], noPermitida: ["Datos sensibles (salud, religión).", "Información financiera.", "Bases de datos de empresas."] },
            { id: 4, titulo: "5. Responsabilidades del Estudiante", contenido: ["Mantener acceso a su cuenta.", "No almacenar información sensible.", "Entregar copias en Classroom.", "Gestionar permisos y respaldos."], nota: "Si pierdes acceso, eres responsable de recuperar o rehacer tus trabajos." },
            { id: 5, titulo: "6. Responsabilidades del Docente", contenido: ["No solicitar información privada.", "No es responsable por pérdida en cuentas personales.", "No garantiza continuidad de Classroom tras fin de contrato."] },
            { id: 7, titulo: "7. Propiedad de Recursos y Cambios", contenido: ["Archivos de estudiantes pertenecen a estudiantes.", "Materiales de docente pertenecen al docente.", "Classroom puede cerrarse al finalizar el contrato.", "Google puede modificar almacenamiento o funciones."] },
            { id: 8, titulo: "8. Declaración Final", contenido: ["El uso de cuentas personales es una solución temporal.", "Busca proteger a ambas partes y asegurar el funcionamiento académico."] }
        ]
    };

    const poolPreguntas = [
        { p: "¿Cuál es el propósito principal de esta política?", o: ["Sustituir el correo institucional", "Garantizar claridad operativa y reducir riesgos", "Vigilancia de correos"], a: 1, ref: "Sección 1 (Propósito)" },
        { p: "¿A quiénes aplica este anexo?", o: ["Solo a docentes", "A administrativos del CESP", "Estudiantes matriculados y docente del módulo"], a: 2, ref: "Sección 2 (Alcance)" },
        { p: "¿Qué herramientas de Google cubre esta política?", o: ["Solo Classroom", "Drive, Docs, Sheets, Sites y AppSheet entre otros", "Solo Gmail"], a: 1, ref: "Sección 2 (Alcance)" },
        { p: "¿A quién pertenecen las cuentas utilizadas?", o: ["Al CESP", "Son cuentas personales no institucionales", "A Google Inc."], a: 1, ref: "Sección 3 (Naturaleza)" },
        { p: "¿Se permite almacenar datos de salud o financieros?", o: ["Sí, para prácticas", "No, son datos sensibles no permitidos", "Depende del docente"], a: 1, ref: "Sección 4 (Información Permitida)" },
        { p: "¿Qué debe hacer el estudiante con sus trabajos?", o: ["Borrarlos al terminar", "Entregar copias en Classroom y realizar respaldos", "No es necesario respaldar"], a: 1, ref: "Sección 5 (Responsabilidades Estudiante)" },
        { p: "¿Qué sucede si el estudiante pierde acceso a su cuenta?", o: ["El docente le da una clave nueva", "Es responsable de crear una nueva y recuperar su trabajo", "El CESP recupera la cuenta"], a: 1, ref: "Sección 5 (Responsabilidades Estudiante)" },
        { p: "¿Es responsable el docente por la pérdida de archivos en Drive personal?", o: ["Sí, siempre", "No, la gestión de la cuenta personal es del estudiante", "Solo si él borra el archivo"], a: 1, ref: "Sección 6 (Responsabilidades Docente)" },
        { p: "¿Garantiza el docente la continuidad de Classroom tras el fin del contrato?", o: ["Sí, indefinidamente", "No, el Classroom puede cerrarse", "Solo para graduados"], a: 1, ref: "Sección 6 (Responsabilidades Docente)" },
        { p: "¿A quién pertenecen los materiales creados por el docente?", o: ["Al CESP", "A los estudiantes", "Al docente"], a: 2, ref: "Sección 7 (Propiedad de Recursos)" },
        { p: "¿Qué debe hacer el estudiante antes de finalizar el curso?", o: ["Pedir permiso", "Respaldar sus proyectos personales", "Eliminar todo el contenido"], a: 1, ref: "Sección 7 (Propiedad de Recursos)" },
        { p: "¿Qué ocurre si Google cambia su política de almacenamiento?", o: ["El docente ajustará las actividades", "El CESP pagará el almacenamiento", "Se cancela el curso"], a: 0, ref: "Sección 7 (Cambios en Google)" },
        { p: "¿Es el uso de estas cuentas una solución permanente?", o: ["Sí", "No, es una solución operativa temporal", "Es el estándar nacional"], a: 1, ref: "Sección 8 (Declaración Final)" },
        { p: "¿Se puede subir información de terceros sin autorización?", o: ["Sí, si es educativo", "No está permitido", "Solo si no es sensible"], a: 1, ref: "Sección 4 (Información No Permitida)" },
        { p: "¿Quién controla los permisos de compartición de los archivos del estudiante?", o: ["El sistema", "El docente", "El propio estudiante"], a: 2, ref: "Sección 5 (Responsabilidades Estudiante)" }
    ];

    const [step, setStep] = useState('lecture');
    const [currentSection, setCurrentSection] = useState(0);
    const [checkedSections, setCheckedSections] = useState({});
    const [quizQuestions, setQuizQuestions] = useState([]);
    const [quizAnswers, setQuizAnswers] = useState({});
    const [quizStatus, setQuizStatus] = useState(null);
    const [signature, setSignature] = useState({ nombre: '', apellido: '', curso: '' });
    const [cursos, setCursos] = useState([]);
    const [registrationId, setRegistrationId] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoadingCursos, setIsLoadingCursos] = useState(true);
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        const fetchCursos = async () => {
            try {
                const response = await fetch(WEB_APP_URL);
                const data = await response.json();
                if (Array.isArray(data)) setCursos(data);
            } catch (err) {
                console.error("Error cargando cursos:", err);
            } finally {
                setIsLoadingCursos(false);
            }
        };
        fetchCursos();
    }, [WEB_APP_URL]);

    const handleSignatureSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrorMsg("");
        const tempID = "CESP-" + Math.floor(Math.random() * 900000 + 100000);
        try {
            await fetch(WEB_APP_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'text/plain' },
                body: JSON.stringify(signature)
            });
            setRegistrationId(tempID);
            setStep('success');
        } catch (err) {
            setErrorMsg("Error de conexión. Inténtalo de nuevo.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const resetToLecture = () => {
        setCurrentSection(0);
        setQuizAnswers({});
        setQuizStatus(null);
        setStep('lecture');
    };

    const copyId = () => {
        const el = document.createElement('textarea');
        el.value = registrationId;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
    };

    const section = contentData.secciones[currentSection];

    return (
        <div className="min-h-screen bg-gray-50 text-slate-800 font-sans flex flex-col">
            {/* HEADER CON TÍTULO PRINCIPAL */}
            <header className="bg-slate-800 text-white py-8 px-4 text-center shadow-lg">
                <h2 className="text-xl md:text-2xl font-black max-w-2xl mx-auto leading-tight uppercase tracking-tight">
                    {contentData.titulo}
                </h2>
                <div className="flex items-center justify-center gap-2 mt-2">
                    <ShieldCheck size={16} className="text-teal-400" />
                    <p className="text-teal-400 font-bold text-sm uppercase tracking-widest">{contentData.subtitulo}</p>
                </div>
            </header>

            <main className="flex-grow max-w-3xl mx-auto w-full px-4 py-8">
                {step === 'lecture' && (
                    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="flex items-center gap-2 mb-6">
                            <span className="bg-teal-100 text-teal-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter">
                                Sección {currentSection + 1} de {contentData.secciones.length}
                            </span>
                        </div>

                        <h3 className="text-xl font-bold text-slate-800 mb-6 border-l-4 border-teal-500 pl-4">
                            {section.titulo}
                        </h3>

                        <div className="space-y-4 mb-8">
                            {section.contenido?.map((item, i) => (
                                <div key={i} className="flex gap-2 text-slate-600 leading-relaxed italic">
                                    <span className="text-teal-400 font-bold">•</span>
                                    <p>{item}</p>
                                </div>
                            ))}

                            {section.bloques?.map((b, i) => (
                                <div key={i} className="bg-slate-50 p-4 rounded-xl border border-slate-100 mt-4">
                                    <h4 className="font-bold text-teal-700 mb-2 text-sm uppercase tracking-tight">{b.subtitulo}</h4>
                                    <ul className="space-y-1">
                                        {b.contenido.map((c, j) => (
                                            <li key={j} className="text-sm text-slate-600 flex gap-2">
                                                <span className="text-slate-300">-</span> {c}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}

                            {section.tipo === 'comparativa' && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                    <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100">
                                        <h4 className="text-emerald-700 font-bold text-sm mb-3 flex items-center gap-2">
                                            <CheckCircle size={14} /> Permitida
                                        </h4>
                                        <ul className="space-y-2">
                                            {section.permitida.map((p, i) => (
                                                <li key={i} className="text-[11px] text-emerald-800 flex gap-2">
                                                    <span>✓</span> {p}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="bg-rose-50 p-4 rounded-xl border border-rose-100">
                                        <h4 className="text-rose-700 font-bold text-sm mb-3 flex items-center gap-2">
                                            <AlertCircle size={14} /> No Permitida
                                        </h4>
                                        <ul className="space-y-2">
                                            {section.noPermitida.map((p, i) => (
                                                <li key={i} className="text-[11px] text-rose-800 flex gap-2">
                                                    <span>✕</span> {p}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
                            <label className="flex items-center gap-2 cursor-pointer group">
                                <input
                                    type="checkbox"
                                    checked={checkedSections[currentSection] || false}
                                    onChange={() => setCheckedSections(prev => ({ ...prev, [currentSection]: !prev[currentSection] }))}
                                    className="w-5 h-5 accent-teal-600 rounded border-slate-300 transition-all group-hover:scale-110"
                                />
                                <span className="text-sm font-bold text-slate-500 group-hover:text-slate-700 transition-colors">He leído y comprendo este punto</span>
                            </label>

                            <div className="flex gap-2 w-full sm:w-auto">
                                <button
                                    disabled={currentSection === 0}
                                    onClick={() => setCurrentSection(currentSection - 1)}
                                    className="flex-1 sm:flex-none px-4 py-2 border border-slate-200 rounded-xl disabled:opacity-0 hover:bg-slate-50 transition-colors"
                                >
                                    <ChevronLeft className="text-slate-400" />
                                </button>
                                <button
                                    disabled={!checkedSections[currentSection]}
                                    onClick={() => {
                                        if (currentSection < contentData.secciones.length - 1) {
                                            setCurrentSection(currentSection + 1);
                                        } else {
                                            const shuffled = [...poolPreguntas].sort(() => 0.5 - Math.random());
                                            setQuizQuestions(shuffled.slice(0, 3));
                                            setStep('quiz');
                                        }
                                    }}
                                    className="flex-1 sm:flex-none bg-teal-600 text-white px-8 py-2 rounded-xl font-bold disabled:opacity-30 transition-all hover:bg-teal-700 shadow-lg shadow-teal-500/20"
                                >
                                    Continuar
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {step === 'quiz' && (
                    <div className="space-y-6 animate-in fade-in duration-500">
                        <div className="text-center mb-4">
                            <h2 className="text-2xl font-black text-slate-700">Validación de Comprensión</h2>
                            <p className="text-slate-500 text-sm italic">Responde correctamente las 3 preguntas aleatorias.</p>
                        </div>

                        {quizQuestions.map((q, i) => {
                            const isWrong = quizStatus === 'error' && quizAnswers[i] !== q.a;
                            return (
                                <div key={i} className={`bg-white p-6 rounded-2xl border transition-all ${isWrong ? 'border-rose-300 bg-rose-50/30' : 'border-slate-100 shadow-sm'}`}>
                                    <p className="font-bold mb-4 text-slate-800">{i + 1}. {q.p}</p>
                                    <div className="space-y-2">
                                        {q.o.map((opt, oi) => {
                                            const isSelected = quizAnswers[i] === oi;
                                            const showAsError = isWrong && isSelected;
                                            return (
                                                <button
                                                    key={oi}
                                                    disabled={quizStatus === 'error'}
                                                    onClick={() => setQuizAnswers({ ...quizAnswers, [i]: oi })}
                                                    className={`w-full text-left p-4 rounded-xl border-2 transition-all text-sm ${showAsError
                                                            ? 'border-rose-500 bg-rose-100 text-rose-700 font-bold'
                                                            : isSelected
                                                                ? 'border-teal-500 bg-teal-50 text-teal-700 font-bold'
                                                                : 'border-slate-50 hover:border-slate-200 bg-slate-50/50'
                                                        }`}
                                                >
                                                    {opt}
                                                </button>
                                            );
                                        })}
                                    </div>
                                    {isWrong && (
                                        <div className="mt-4 flex items-center gap-2 text-rose-600 text-[11px] font-bold bg-white p-3 rounded-lg border border-rose-200 shadow-sm">
                                            <AlertCircle size={14} className="flex-shrink-0" />
                                            <span>REFERENCIA: {q.ref}</span>
                                        </div>
                                    )}
                                </div>
                            );
                        })}

                        <div className="space-y-3">
                            {quizStatus !== 'error' ? (
                                <button
                                    disabled={Object.keys(quizAnswers).length < 3}
                                    onClick={() => {
                                        const allCorrect = quizQuestions.every((q, i) => quizAnswers[i] === q.a);
                                        if (allCorrect) setStep('signature');
                                        else setQuizStatus('error');
                                    }}
                                    className="w-full bg-slate-800 text-white py-4 rounded-xl font-bold hover:bg-slate-900 transition-all shadow-xl disabled:opacity-50"
                                >
                                    Verificar Respuestas
                                </button>
                            ) : (
                                <div className="space-y-3">
                                    <div className="p-4 bg-rose-600 text-white rounded-xl text-center font-bold text-sm shadow-lg flex items-center justify-center gap-2 animate-bounce">
                                        <RefreshCcw size={18} /> Revisa tus errores y repasa
                                    </div>
                                    <button
                                        onClick={resetToLecture}
                                        className="w-full bg-teal-600 text-white py-4 rounded-xl font-bold hover:bg-teal-700 transition-all flex items-center justify-center gap-2 shadow-lg"
                                    >
                                        <BookOpen size={18} /> Volver a leer la política
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {step === 'signature' && (
                    <form onSubmit={handleSignatureSubmit} className="max-w-md mx-auto bg-white p-8 rounded-3xl shadow-2xl space-y-4 border border-slate-100 animate-in slide-in-from-bottom-4 duration-500">
                        <div className="text-center mb-6">
                            <div className="w-16 h-16 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <PenTool size={32} />
                            </div>
                            <h2 className="text-2xl font-black">Firma Digital</h2>
                            <p className="text-slate-500 text-xs italic font-medium">Al completar este formulario, dejas constancia de tu aceptación legal.</p>
                        </div>

                        {errorMsg && <div className="p-3 bg-rose-50 text-rose-600 text-xs font-bold rounded-lg text-center border border-rose-200">{errorMsg}</div>}

                        <div className="space-y-1">
                            <label className="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest">Grupo Académico</label>
                            <select
                                required
                                className="w-full p-4 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-teal-500 outline-none bg-slate-50"
                                onChange={e => setSignature({ ...signature, curso: e.target.value })}
                                value={signature.curso}
                            >
                                <option value="">-- Selecciona tu grupo --</option>
                                {cursos.map((c, i) => <option key={i} value={c}>{c}</option>)}
                            </select>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                            <div className="space-y-1">
                                <label className="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest">Nombres Completos</label>
                                <input
                                    required
                                    placeholder="Ej: Juan Camilo"
                                    className="w-full p-4 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-teal-500 outline-none bg-slate-50"
                                    onChange={e => setSignature({ ...signature, nombre: e.target.value })}
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest">Apellidos Completos</label>
                                <input
                                    required
                                    placeholder="Ej: Pérez García"
                                    className="w-full p-4 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-teal-500 outline-none bg-slate-50"
                                    onChange={e => setSignature({ ...signature, apellido: e.target.value })}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-teal-600 text-white py-4 rounded-xl font-black uppercase tracking-widest text-sm flex items-center justify-center gap-2 disabled:opacity-50 hover:bg-teal-700 transition-all shadow-xl shadow-teal-500/20 mt-4"
                        >
                            {isSubmitting ? <RotateCcw className="animate-spin" /> : "Confirmar Firma"}
                        </button>
                    </form>
                )}

                {step === 'success' && (
                    <div className="text-center animate-in zoom-in-95 duration-700">
                        <div className="bg-white p-10 rounded-[40px] shadow-2xl border border-slate-100 max-w-sm mx-auto">
                            <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                <CheckCircle size={40} />
                            </div>
                            <h2 className="text-3xl font-black mb-2 text-slate-800 tracking-tight">¡Registrado!</h2>
                            <p className="text-slate-500 mb-8 text-sm font-medium leading-relaxed">Tu firma ha sido enviada al sistema correctamente.</p>

                            <div className="bg-slate-50 p-6 rounded-3xl border-2 border-dashed border-teal-200 relative">
                                <span className="text-[10px] font-black text-teal-600 uppercase absolute -top-3 left-1/2 -translate-x-1/2 bg-white px-3 tracking-widest">Id de Registro</span>
                                <span className="text-3xl font-mono font-black text-slate-700 tracking-tighter">{registrationId}</span>
                                <button
                                    onClick={copyId}
                                    className="mt-6 w-full py-2 bg-white rounded-xl text-[10px] font-black text-teal-600 hover:bg-teal-50 transition-all flex items-center justify-center gap-2 border border-teal-100 shadow-sm"
                                >
                                    <Copy size={12} /> Copiar Id de Validación
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </main>

            {/* FOOTER ACTUALIZADO */}
            <footer className="bg-white border-t border-slate-200 py-8 mt-auto">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">
                        Creado por Stevens Contreras | 2026
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default App;
