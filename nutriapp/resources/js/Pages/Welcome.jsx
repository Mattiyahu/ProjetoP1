import { Head } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import ThemeToggle from '@/Components/ThemeToggle';

const HERO_BG = '/images/hero-bg.jpg';

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="NutriApp - Seu assistente nutricional" />
            
            <div className="min-h-screen bg-beige-100 dark:bg-dark-bg transition-colors duration-300">
                <Navbar auth={auth} />
                <ThemeToggle />
                
                {/* Hero Section */}
                <section className="hero" style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('${HERO_BG}')` }}>
                    <div className="hero-content">
                        <div className="animate-fade-in">
                            <h1>
                                Transforme sua saúde com orientação nutricional personalizada
                            </h1>
                            <p>
                                Acompanhamento profissional, planos alimentares personalizados
                                e suporte contínuo para alcançar seus objetivos.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <a href={route('register')} className="btn-primary">
                                    Comece Agora
                                </a>
                                <a href="#sobre" className="btn-secondary">
                                    Saiba Mais
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Stats Section */}
                <section className="section bg-white dark:bg-dark-bg">
                    <div className="stats-container">
                        <div className="stat-card animate-slide-left">
                            <div className="stat-number">5000+</div>
                            <div className="text-primary-600 dark:text-dark-text">Usuários Ativos</div>
                        </div>
                        <div className="stat-card animate-slide-left">
                            <div className="stat-number">95%</div>
                            <div className="text-primary-600 dark:text-dark-text">Taxa de Satisfação</div>
                        </div>
                        <div className="stat-card animate-slide-right">
                            <div className="stat-number">50+</div>
                            <div className="text-primary-600 dark:text-dark-text">Nutricionistas</div>
                        </div>
                        <div className="stat-card animate-slide-right">
                            <div className="stat-number">24/7</div>
                            <div className="text-primary-600 dark:text-dark-text">Suporte</div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section id="servicos" className="section bg-beige-100 dark:bg-dark-bg">
                    <div className="container-custom">
                        <h2 className="section-title animate-fade-in">Nossos Serviços</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="feature-card animate-slide-left">
                                <div className="feature-icon">
                                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Planos Personalizados</h3>
                                <p className="text-primary-600 dark:text-dark-text">
                                    Planos alimentares adaptados às suas necessidades e objetivos específicos.
                                </p>
                            </div>

                            <div className="feature-card animate-fade-in">
                                <div className="feature-icon">
                                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Acompanhamento 24h</h3>
                                <p className="text-primary-600 dark:text-dark-text">
                                    Suporte contínuo com nossa equipe de nutricionistas qualificados.
                                </p>
                            </div>

                            <div className="feature-card animate-slide-right">
                                <div className="feature-icon">
                                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Análise de Progresso</h3>
                                <p className="text-primary-600 dark:text-dark-text">
                                    Acompanhamento detalhado da sua evolução com métricas e gráficos.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Parallax Section */}
                <section className="parallax" style={{ backgroundImage: `url('${HERO_BG}')` }}>
                    <div className="parallax-overlay"></div>
                    <div className="parallax-content">
                        <div className="animate-fade-in">
                            <h2 className="text-4xl font-bold mb-4">Comece sua jornada hoje</h2>
                            <p className="text-xl mb-8">
                                Transforme sua relação com a alimentação e conquiste uma vida mais saudável
                            </p>
                            <a href={route('register')} className="btn-primary">
                                Cadastre-se Gratuitamente
                            </a>
                        </div>
                    </div>
                </section>

                {/* Testimonials Section */}
                <section id="depoimentos" className="section bg-beige-100 dark:bg-dark-bg">
                    <div className="container-custom">
                        <h2 className="section-title animate-fade-in">O que dizem nossos usuários</h2>
                        <div className="testimonials-grid">
                            <div className="testimonial-card animate-slide-left">
                                <div className="testimonial-quote">"</div>
                                <p className="text-primary-600 dark:text-dark-text mb-4">
                                    O NutriApp transformou minha vida! Com o plano personalizado, 
                                    consegui atingir meus objetivos de forma saudável e sustentável.
                                </p>
                                <div className="font-semibold text-primary dark:text-dark-primary">Maria Silva</div>
                            </div>

                            <div className="testimonial-card animate-fade-in">
                                <div className="testimonial-quote">"</div>
                                <p className="text-primary-600 dark:text-dark-text mb-4">
                                    O suporte 24/7 faz toda a diferença. Sempre que preciso, 
                                    tenho ajuda profissional para manter minha dieta nos trilhos.
                                </p>
                                <div className="font-semibold text-primary dark:text-dark-primary">João Santos</div>
                            </div>

                            <div className="testimonial-card animate-slide-right">
                                <div className="testimonial-quote">"</div>
                                <p className="text-primary-600 dark:text-dark-text mb-4">
                                    Excelente aplicativo! A análise de progresso me ajuda a 
                                    manter o foco e ver os resultados de forma clara.
                                </p>
                                <div className="font-semibold text-primary dark:text-dark-primary">Ana Oliveira</div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}
