import { Head } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import AnimatedElement from '@/Components/AnimatedElement';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';

const HERO_BG = 'https://images.unsplash.com/photo-1490818387583-1baba5e638af?auto=format&fit=crop&w=1932&q=80';
const PARALLAX_BG = 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=2070&q=80';

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="NutriApp - Seu assistente nutricional" />
            
            <div className="min-h-screen">
                <Navbar auth={auth} />

                {/* Hero Section */}
                <section className="hero" style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('${HERO_BG}')` }}>
                    <div className="hero-content">
                        <AnimatedElement animation="fade-in">
                            <h1 className="text-shadow mb-6">
                                Transforme sua saúde com orientação nutricional personalizada
                            </h1>
                            <p className="text-xl mb-8 text-beige-100">
                                Acompanhamento profissional, planos alimentares personalizados
                                e suporte contínuo para alcançar seus objetivos.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <PrimaryButton href={route('register')}>
                                    Comece Agora
                                </PrimaryButton>
                                <SecondaryButton href="#sobre">
                                    Saiba Mais
                                </SecondaryButton>
                            </div>
                        </AnimatedElement>
                    </div>
                </section>

                {/* Stats Section */}
                <section className="section bg-beige-100">
                    <div className="stats-container">
                        <AnimatedElement animation="slide-in-left" delay={200}>
                            <div className="stat-card">
                                <div className="stat-number">5000+</div>
                                <div className="text-primary-600">Usuários Ativos</div>
                            </div>
                        </AnimatedElement>
                        <AnimatedElement animation="slide-in-left" delay={400}>
                            <div className="stat-card">
                                <div className="stat-number">95%</div>
                                <div className="text-primary-600">Taxa de Satisfação</div>
                            </div>
                        </AnimatedElement>
                        <AnimatedElement animation="slide-in-right" delay={600}>
                            <div className="stat-card">
                                <div className="stat-number">50+</div>
                                <div className="text-primary-600">Nutricionistas</div>
                            </div>
                        </AnimatedElement>
                        <AnimatedElement animation="slide-in-right" delay={800}>
                            <div className="stat-card">
                                <div className="stat-number">24/7</div>
                                <div className="text-primary-600">Suporte</div>
                            </div>
                        </AnimatedElement>
                    </div>
                </section>

                {/* Features Section */}
                <section id="servicos" className="section bg-white">
                    <div className="max-w-7xl mx-auto px-4">
                        <AnimatedElement>
                            <h2 className="section-title">Nossos Serviços</h2>
                        </AnimatedElement>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <AnimatedElement animation="slide-in-left" delay={200}>
                                <div className="feature-card">
                                    <div className="h-16 w-16 bg-primary-50 rounded-full flex items-center justify-center mb-4">
                                        <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2">Planos Personalizados</h3>
                                    <p className="text-primary-600">
                                        Planos alimentares adaptados às suas necessidades e objetivos específicos.
                                    </p>
                                </div>
                            </AnimatedElement>

                            <AnimatedElement animation="fade-in" delay={400}>
                                <div className="feature-card">
                                    <div className="h-16 w-16 bg-primary-50 rounded-full flex items-center justify-center mb-4">
                                        <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2">Acompanhamento 24h</h3>
                                    <p className="text-primary-600">
                                        Suporte contínuo com nossa equipe de nutricionistas qualificados.
                                    </p>
                                </div>
                            </AnimatedElement>

                            <AnimatedElement animation="slide-in-right" delay={600}>
                                <div className="feature-card">
                                    <div className="h-16 w-16 bg-primary-50 rounded-full flex items-center justify-center mb-4">
                                        <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2">Análise de Progresso</h3>
                                    <p className="text-primary-600">
                                        Acompanhamento detalhado da sua evolução com métricas e gráficos.
                                    </p>
                                </div>
                            </AnimatedElement>
                        </div>
                    </div>
                </section>

                {/* Parallax Section */}
                <section className="parallax h-[400px]" style={{ backgroundImage: `url('${PARALLAX_BG}')` }}>
                    <div className="parallax-overlay flex items-center justify-center">
                        <div className="text-center text-white">
                            <AnimatedElement>
                                <h2 className="text-4xl font-bold mb-4">Comece sua jornada hoje</h2>
                                <p className="text-xl mb-8">
                                    Transforme sua relação com a alimentação e conquiste uma vida mais saudável
                                </p>
                                <PrimaryButton href={route('register')}>
                                    Cadastre-se Gratuitamente
                                </PrimaryButton>
                            </AnimatedElement>
                        </div>
                    </div>
                </section>

                {/* Testimonials Section */}
                <section id="depoimentos" className="section bg-beige-100">
                    <div className="max-w-7xl mx-auto px-4">
                        <AnimatedElement>
                            <h2 className="section-title">O que dizem nossos usuários</h2>
                        </AnimatedElement>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <AnimatedElement animation="slide-in-left" delay={200}>
                                <div className="testimonial-card">
                                    <div className="testimonial-quote">"</div>
                                    <p className="text-primary-600 mb-4">
                                        O NutriApp transformou minha vida! Com o plano personalizado, 
                                        consegui atingir meus objetivos de forma saudável e sustentável.
                                    </p>
                                    <div className="font-semibold text-primary">Maria Silva</div>
                                </div>
                            </AnimatedElement>

                            <AnimatedElement animation="fade-in" delay={400}>
                                <div className="testimonial-card">
                                    <div className="testimonial-quote">"</div>
                                    <p className="text-primary-600 mb-4">
                                        O suporte 24/7 faz toda a diferença. Sempre que preciso, 
                                        tenho ajuda profissional para manter minha dieta nos trilhos.
                                    </p>
                                    <div className="font-semibold text-primary">João Santos</div>
                                </div>
                            </AnimatedElement>

                            <AnimatedElement animation="slide-in-right" delay={600}>
                                <div className="testimonial-card">
                                    <div className="testimonial-quote">"</div>
                                    <p className="text-primary-600 mb-4">
                                        Excelente aplicativo! A análise de progresso me ajuda a 
                                        manter o foco e ver os resultados de forma clara.
                                    </p>
                                    <div className="font-semibold text-primary">Ana Oliveira</div>
                                </div>
                            </AnimatedElement>
                        </div>
                    </div>
                </section>

                <Footer />
            </div>
        </>
    );
}
