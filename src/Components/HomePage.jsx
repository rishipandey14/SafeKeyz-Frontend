import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import { BASE_URL } from '../utils/constants';
import { Shield, Lock, Share2, Zap, Eye, Users, Check, ArrowRight } from "lucide-react";
import { useSelector } from "react-redux";

const HomePage = () => {
  const user = useSelector((store) => store?.user?.user);
  const [stats, setStats] = useState({
    users: 0,
    credentials: 0,
    devices: 0,
  });
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(BASE_URL + "/stats");
        const payload = res?.data?.data;
        if (payload) {
          setStats({
            users: payload.usersCount ?? 0,
            credentials: payload.credentialsCount ?? 0,
            devices: payload.deviceCount ?? 0,
          });
        }
      } catch (err) {
        console.error("Failed to get stats", err);
      }
    };
    fetchStats();
  }, []);

  // Auto-slide testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(timer);
  }, []);

  const features = [
    {
      icon: Lock,
      title: "Military-Grade Encryption",
      description: "Your passwords are encrypted with AES-256, ensuring maximum security"
    },
    {
      icon: Share2,
      title: "Secure Sharing",
      description: "Share passwords safely with team members with granular permissions"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Instant access to your vault from any device, anytime"
    },
    {
      icon: Eye,
      title: "Privacy First",
      description: "We never store, see, or access your passwords. Only you do"
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Manage passwords across your entire organization securely"
    },
    {
      icon: Shield,
      title: "Always Protected",
      description: "Advanced security features keep your data safe 24/7"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Security Officer",
      text: "SafeKeyz has transformed how we manage passwords. It's secure, intuitive, and reliable.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
    },
    {
      name: "Mike Chen",
      role: "Startup Founder",
      text: "The best password manager we've used. Great features and excellent support.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike"
    },
    {
      name: "Emma Davis",
      role: "HR Manager",
      text: "Perfect for team collaboration. Made password management effortless.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma"
    }
  ];

  const pricingPlans = [
    {
      name: "Free",
      price: "0",
      description: "Perfect for personal use",
      features: [
        "Up to 50 passwords",
        "Basic encryption",
        "1 device",
        "Email support"
      ],
      buttonText: "Get Started",
      buttonStyle: "bg-gray-200 hover:bg-gray-300 text-gray-900"
    },
    {
      name: "Pro",
      price: "4.99",
      description: "Best for professionals",
      features: [
        "Unlimited passwords",
        "Military-grade encryption",
        "5 devices",
        "Priority support",
        "Password sharing"
      ],
      buttonText: "Start Free Trial",
      buttonStyle: "bg-green-600 hover:bg-green-700 text-white",
      highlighted: true
    },
    {
      name: "Business",
      price: "14.99",
      description: "For teams",
      features: [
        "Everything in Pro",
        "Team management",
        "Advanced reporting",
        "Admin controls",
        "24/7 support"
      ],
      buttonText: "Contact Sales",
      buttonStyle: "bg-gray-200 hover:bg-gray-300 text-gray-900"
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white pt-20 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                  Password Management
                  <span className="text-green-600"> Made Simple</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  SafeKeyz is the secure password manager that protects your digital life. Store, manage, and share passwords with enterprise-grade encryption.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                {user ? (
                  <Link
                    to="/vault"
                    className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    Open Your Vault
                    <ArrowRight size={20} />
                  </Link>
                ) : (
                  <>
                    <Link
                      to="/login"
                      state={{isLoginForm : false}}
                      className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                      Get Started Free
                      <ArrowRight size={20} />
                    </Link>
                    <a
                      href="#features"
                      className="inline-flex items-center justify-center gap-2 border-2 border-gray-300 hover:border-green-600 text-gray-900 hover:text-green-600 px-8 py-4 rounded-lg font-semibold transition-all duration-200"
                    >
                      Learn More
                    </a>
                  </>
                )}
              </div>

              {/* Trust Badges */}
              <div className="flex items-center gap-6 pt-4">
                <div className="flex items-center gap-2">
                  <Shield size={20} className="text-green-600" />
                  <span className="text-gray-700 font-medium">256-bit Encryption</span>
                </div>
                <div className="flex items-center gap-2">
                  <Lock size={20} className="text-green-600" />
                  <span className="text-gray-700 font-medium">Zero-Knowledge</span>
                </div>
              </div>
            </div>

            {/* Right Visual */}
            <div className="hidden md:block">
              <div className="relative">
                <div className="bg-gradient-to-br from-green-100 to-gray-100 rounded-2xl p-8 shadow-2xl">
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                      <div className="h-3 bg-green-200 rounded w-32 mb-2"></div>
                      <div className="h-2 bg-gray-200 rounded w-full"></div>
                      <div className="h-2 bg-gray-200 rounded w-4/5 mt-2"></div>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                      <div className="h-3 bg-green-200 rounded w-32 mb-2"></div>
                      <div className="h-2 bg-gray-200 rounded w-full"></div>
                      <div className="h-2 bg-gray-200 rounded w-4/5 mt-2"></div>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                      <div className="h-3 bg-green-200 rounded w-32 mb-2"></div>
                      <div className="h-2 bg-gray-200 rounded w-full"></div>
                      <div className="h-2 bg-gray-200 rounded w-4/5 mt-2"></div>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-green-600 rounded-full opacity-20 blur-xl"></div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-gray-200 pt-12">
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">{stats.users.toLocaleString()}+</div>
              <p className="text-gray-600">Active Users</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">{stats.credentials.toLocaleString()}+</div>
              <p className="text-gray-600">Passwords Secured</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">{stats.devices.toLocaleString()}+</div>
              <p className="text-gray-600">Devices Protected</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose SafeKeyz?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to keep your passwords secure and organized
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div key={idx} className="bg-white p-8 rounded-xl border border-gray-200 hover:border-green-300 hover:shadow-lg transition-all duration-300">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                    <Icon size={24} className="text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How SafeKeyz Works</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Simple, secure, and straightforward
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: "1", title: "Create Account", desc: "Sign up with your email" },
              { step: "2", title: "Add Passwords", desc: "Store all your passwords" },
              { step: "3", title: "Auto-Fill", desc: "Seamless login experience" },
              { step: "4", title: "Share Safely", desc: "Secure password sharing" }
            ].map((item, idx) => (
              <div key={idx} className="text-center">
                <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Loved by Thousands</h2>
            <p className="text-xl text-gray-600">See what our users say about SafeKeyz</p>
          </div>

          {/* Carousel Container */}
          <div className="relative max-w-xl mx-auto">
            {/* Decorative background elements */}
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-green-200 rounded-full opacity-20 blur-3xl"></div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-green-300 rounded-full opacity-20 blur-3xl"></div>
            
            <div className="overflow-hidden relative">
              <div 
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
              >
                {testimonials.map((testimonial, idx) => (
                  <div key={idx} className="w-full flex-shrink-0 px-3">
                    <div className="bg-white p-6 md:p-8 rounded-xl border border-gray-200 shadow-2xl relative overflow-hidden">
                      {/* Subtle gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-green-50/30 via-transparent to-transparent pointer-events-none"></div>
                      <div className="relative z-10">
                        <div className="flex flex-col items-center text-center">
                          <img src={testimonial.avatar} alt={testimonial.name} className="w-16 h-16 rounded-full mb-4 ring-2 ring-green-100" />
                          <div className="flex gap-1 mb-3">
                            {[...Array(5)].map((_, i) => (
                              <span key={i} className="text-green-600 text-lg">★</span>
                            ))}
                          </div>
                          <p className="text-gray-700 text-base italic mb-4 leading-relaxed">"{testimonial.text}"</p>
                          <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                          <p className="text-sm text-gray-600">{testimonial.role}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Dots */}
            <div className="flex justify-center gap-3 mt-8">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentTestimonial(idx)}
                  className={`transition-all duration-300 rounded-full ${
                    currentTestimonial === idx 
                      ? 'w-8 h-3 bg-green-600' 
                      : 'w-3 h-3 bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              ))}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={() => setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white hover:bg-gray-50 text-gray-700 p-3 rounded-full shadow-lg border border-gray-200 transition-all hover:scale-110"
              aria-label="Previous testimonial"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white hover:bg-gray-50 text-gray-700 p-3 rounded-full shadow-lg border border-gray-200 transition-all hover:scale-110"
              aria-label="Next testimonial"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-gray-600">Choose the plan that fits your needs</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, idx) => (
              <div 
                key={idx} 
                className={`rounded-xl border-2 transition-all duration-300 ${
                  plan.highlighted 
                    ? "border-green-600 bg-green-50 shadow-xl scale-105" 
                    : "border-gray-200 bg-white hover:border-gray-300"
                }`}
              >
                <div className="p-8">
                  {plan.highlighted && (
                    <div className="bg-green-600 text-white text-sm font-semibold px-3 py-1 rounded-full inline-block mb-4">
                      Most Popular
                    </div>
                  )}
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-6">{plan.description}</p>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-gray-900">${plan.price}</span>
                    <span className="text-gray-600">/month</span>
                  </div>

                  <button className={`w-full py-3 px-4 rounded-lg font-semibold mb-8 transition-all ${plan.buttonStyle}`}>
                    {plan.buttonText}
                  </button>

                  <div className="space-y-4">
                    {plan.features.map((feature, fidx) => (
                      <div key={fidx} className="flex items-center gap-3">
                        <Check size={20} className="text-green-600 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-50 to-gray-50 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Ready to Secure Your Digital Life?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of users who trust SafeKeyz to protect their passwords
          </p>
          {user ? (
            <Link
              to="/vault"
              className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Go to Your Vault
              <ArrowRight size={20} />
            </Link>
          ) : (
            <Link
              to="/login"
              state={{isLoginForm : false}}
              className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Get Started Free
              <ArrowRight size={20} />
            </Link>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-100 py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-green-600 p-2 rounded-full">
                  <Lock size={20} className="text-white" />
                </div>
                <span className="font-bold text-lg">SafeKeyz</span>
              </div>
              <p className="text-gray-400">Secure password management for everyone</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-gray-100">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-green-400">Features</a></li>
                <li><a href="#" className="hover:text-green-400">Pricing</a></li>
                <li><a href="#" className="hover:text-green-400">Security</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-gray-100">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-green-400">About</a></li>
                <li><a href="#" className="hover:text-green-400">Blog</a></li>
                <li><a href="#" className="hover:text-green-400">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-gray-100">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-green-400">Privacy</a></li>
                <li><a href="#" className="hover:text-green-400">Terms</a></li>
                <li><a href="#" className="hover:text-green-400">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2025 SafeKeyz. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;