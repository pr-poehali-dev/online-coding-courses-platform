import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

type Course = {
  id: number;
  title: string;
  description: string;
  level: 'Начинающий' | 'Средний' | 'Продвинутый';
  technology: string;
  progress?: number;
  lessons?: number;
  duration?: string;
};

type Lesson = {
  id: number;
  title: string;
  duration: string;
  completed: boolean;
};

type Question = {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
};

const Index = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterLevel, setFilterLevel] = useState<string>('all');
  const [filterTech, setFilterTech] = useState<string>('all');
  const [currentLesson, setCurrentLesson] = useState<number>(0);
  const [quizActive, setQuizActive] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const courses: Course[] = [
    {
      id: 1,
      title: 'Основы Python',
      description: 'Изучите основы программирования на Python с нуля',
      level: 'Начинающий',
      technology: 'Python',
      lessons: 12,
      duration: '6 недель'
    },
    {
      id: 2,
      title: 'JavaScript для веб-разработки',
      description: 'Полный курс по JavaScript и современным фреймворкам',
      level: 'Средний',
      technology: 'JavaScript',
      lessons: 18,
      duration: '8 недель'
    },
    {
      id: 3,
      title: 'React: продвинутые паттерны',
      description: 'Освойте продвинутые техники разработки на React',
      level: 'Продвинутый',
      technology: 'React',
      lessons: 15,
      duration: '7 недель'
    },
    {
      id: 4,
      title: 'Алгоритмы и структуры данных',
      description: 'Фундаментальные концепции Computer Science',
      level: 'Средний',
      technology: 'Python',
      lessons: 20,
      duration: '10 недель'
    },
    {
      id: 5,
      title: 'TypeScript с нуля',
      description: 'Типизированный JavaScript для больших проектов',
      level: 'Начинающий',
      technology: 'TypeScript',
      lessons: 14,
      duration: '7 недель'
    },
    {
      id: 6,
      title: 'Node.js Backend разработка',
      description: 'Создавайте серверные приложения на Node.js',
      level: 'Средний',
      technology: 'Node.js',
      lessons: 16,
      duration: '8 недель'
    }
  ];

  const myCourses: Course[] = [
    {
      id: 1,
      title: 'Основы Python',
      description: 'Изучите основы программирования на Python с нуля',
      level: 'Начинающий',
      technology: 'Python',
      progress: 65,
      lessons: 12
    },
    {
      id: 2,
      title: 'JavaScript для веб-разработки',
      description: 'Полный курс по JavaScript и современным фреймворкам',
      level: 'Средний',
      technology: 'JavaScript',
      progress: 30,
      lessons: 18
    }
  ];

  const lessons: Lesson[] = [
    { id: 1, title: 'Введение в Python', duration: '15 мин', completed: true },
    { id: 2, title: 'Переменные и типы данных', duration: '20 мин', completed: true },
    { id: 3, title: 'Условные операторы', duration: '25 мин', completed: true },
    { id: 4, title: 'Циклы for и while', duration: '30 мин', completed: false },
    { id: 5, title: 'Функции', duration: '35 мин', completed: false },
    { id: 6, title: 'Списки и кортежи', duration: '28 мин', completed: false }
  ];

  const quizQuestions: Question[] = [
    {
      id: 1,
      question: 'Что такое переменная в Python?',
      options: [
        'Константа, которая не изменяется',
        'Контейнер для хранения данных',
        'Функция для вычислений',
        'Тип данных'
      ],
      correctAnswer: 1
    },
    {
      id: 2,
      question: 'Какой оператор используется для сравнения на равенство?',
      options: ['=', '==', '===', 'equals()'],
      correctAnswer: 1
    },
    {
      id: 3,
      question: 'Что выведет print(type([1, 2, 3]))?',
      options: ['<class \'tuple\'>', '<class \'list\'>', '<class \'array\'>', '<class \'dict\'>'],
      correctAnswer: 1
    }
  ];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLevel = filterLevel === 'all' || course.level === filterLevel;
    const matchesTech = filterTech === 'all' || course.technology === filterTech;
    return matchesSearch && matchesLevel && matchesTech;
  });

  const technologies = ['all', ...Array.from(new Set(courses.map(c => c.technology)))];
  const levels = ['all', 'Начинающий', 'Средний', 'Продвинутый'];

  const handleStartQuiz = () => {
    setQuizActive(true);
    setCurrentQuestion(0);
    setQuizScore(0);
    setQuizCompleted(false);
    setSelectedAnswer(null);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === quizQuestions[currentQuestion].correctAnswer) {
      setQuizScore(quizScore + 1);
    }

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleRestartQuiz = () => {
    setQuizActive(false);
    setCurrentQuestion(0);
    setQuizScore(0);
    setQuizCompleted(false);
    setSelectedAnswer(null);
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Начинающий':
        return 'bg-green-100 text-green-800 hover:bg-green-100';
      case 'Средний':
        return 'bg-blue-100 text-blue-800 hover:bg-blue-100';
      case 'Продвинутый':
        return 'bg-purple-100 text-purple-800 hover:bg-purple-100';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b sticky top-0 bg-white z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="Code2" className="text-primary" size={32} />
              <h1 className="text-2xl font-bold text-primary">CodeLearn</h1>
            </div>
            <nav className="hidden md:flex gap-6">
              <Button
                variant={activeTab === 'home' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('home')}
              >
                <Icon name="Home" size={18} className="mr-2" />
                Главная
              </Button>
              <Button
                variant={activeTab === 'catalog' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('catalog')}
              >
                <Icon name="BookOpen" size={18} className="mr-2" />
                Каталог
              </Button>
              <Button
                variant={activeTab === 'dashboard' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('dashboard')}
              >
                <Icon name="LayoutDashboard" size={18} className="mr-2" />
                Мои курсы
              </Button>
            </nav>
            <Button variant="outline">
              <Icon name="User" size={18} className="mr-2" />
              Профиль
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {activeTab === 'home' && (
          <div className="animate-fade-in">
            <section className="text-center py-20 mb-16">
              <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Изучай программирование эффективно
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Интерактивные курсы, практические задания и тесты для проверки знаний. 
                Все что нужно для успешного старта в IT.
              </p>
              <div className="flex gap-4 justify-center">
                <Button size="lg" onClick={() => setActiveTab('catalog')}>
                  <Icon name="Rocket" size={20} className="mr-2" />
                  Начать обучение
                </Button>
                <Button size="lg" variant="outline" onClick={() => setActiveTab('dashboard')}>
                  <Icon name="BookMarked" size={20} className="mr-2" />
                  Мои курсы
                </Button>
              </div>
            </section>

            <section className="mb-16">
              <h3 className="text-3xl font-bold mb-8 text-center">Популярные курсы</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.slice(0, 3).map(course => (
                  <Card key={course.id} className="hover:shadow-lg transition-shadow cursor-pointer" style={{ transform: 'scale(1)', transition: 'transform 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
                    <CardHeader>
                      <div className="flex justify-between items-start mb-2">
                        <Badge className={getLevelColor(course.level)}>
                          {course.level}
                        </Badge>
                        <Badge variant="outline">{course.technology}</Badge>
                      </div>
                      <CardTitle className="text-xl">{course.title}</CardTitle>
                      <CardDescription>{course.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Icon name="BookOpen" size={16} />
                          {course.lessons} уроков
                        </span>
                        <span className="flex items-center gap-1">
                          <Icon name="Clock" size={16} />
                          {course.duration}
                        </span>
                      </div>
                      <Button className="w-full mt-4" onClick={() => setActiveTab('catalog')}>
                        Подробнее
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            <section className="bg-muted rounded-lg p-12 text-center">
              <h3 className="text-3xl font-bold mb-4">Почему выбирают CodeLearn?</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-4">
                    <Icon name="GraduationCap" size={32} className="text-white" />
                  </div>
                  <h4 className="font-semibold text-lg mb-2">Структурированное обучение</h4>
                  <p className="text-muted-foreground">От базовых концепций до продвинутых техник</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mb-4">
                    <Icon name="Target" size={32} className="text-white" />
                  </div>
                  <h4 className="font-semibold text-lg mb-2">Практические задания</h4>
                  <p className="text-muted-foreground">Закрепляйте знания на реальных примерах</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mb-4">
                    <Icon name="Award" size={32} className="text-white" />
                  </div>
                  <h4 className="font-semibold text-lg mb-2">Проверка знаний</h4>
                  <p className="text-muted-foreground">Тесты и квизы после каждого модуля</p>
                </div>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'catalog' && (
          <div className="animate-fade-in">
            <h2 className="text-4xl font-bold mb-8">Каталог курсов</h2>
            
            <div className="mb-8 space-y-4">
              <div className="relative">
                <Icon name="Search" size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Поиск курсов..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="flex flex-wrap gap-4">
                <div className="flex gap-2 items-center flex-wrap">
                  <span className="text-sm font-medium">Уровень:</span>
                  {levels.map(level => (
                    <Button
                      key={level}
                      size="sm"
                      variant={filterLevel === level ? 'default' : 'outline'}
                      onClick={() => setFilterLevel(level)}
                    >
                      {level === 'all' ? 'Все' : level}
                    </Button>
                  ))}
                </div>
                <div className="flex gap-2 items-center flex-wrap">
                  <span className="text-sm font-medium">Технология:</span>
                  {technologies.map(tech => (
                    <Button
                      key={tech}
                      size="sm"
                      variant={filterTech === tech ? 'default' : 'outline'}
                      onClick={() => setFilterTech(tech)}
                    >
                      {tech === 'all' ? 'Все' : tech}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map(course => (
                <Card key={course.id} className="hover:shadow-lg transition-shadow cursor-pointer" style={{ transform: 'scale(1)', transition: 'transform 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <Badge className={getLevelColor(course.level)}>
                        {course.level}
                      </Badge>
                      <Badge variant="outline">{course.technology}</Badge>
                    </div>
                    <CardTitle className="text-xl">{course.title}</CardTitle>
                    <CardDescription>{course.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                      <span className="flex items-center gap-1">
                        <Icon name="BookOpen" size={16} />
                        {course.lessons} уроков
                      </span>
                      <span className="flex items-center gap-1">
                        <Icon name="Clock" size={16} />
                        {course.duration}
                      </span>
                    </div>
                    <Button className="w-full">
                      Записаться на курс
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredCourses.length === 0 && (
              <div className="text-center py-16">
                <Icon name="SearchX" size={64} className="mx-auto text-muted-foreground mb-4" />
                <p className="text-xl text-muted-foreground">Курсы не найдены</p>
                <p className="text-muted-foreground mt-2">Попробуйте изменить критерии поиска</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'dashboard' && (
          <div className="animate-fade-in">
            <h2 className="text-4xl font-bold mb-8">Мои курсы</h2>
            
            {selectedCourse ? (
              <div>
                <Button
                  variant="ghost"
                  className="mb-6"
                  onClick={() => {
                    setSelectedCourse(null);
                    setQuizActive(false);
                  }}
                >
                  <Icon name="ArrowLeft" size={18} className="mr-2" />
                  Назад к курсам
                </Button>

                <Card className="mb-6">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-3xl">{selectedCourse.title}</CardTitle>
                        <CardDescription className="text-lg mt-2">{selectedCourse.description}</CardDescription>
                      </div>
                      <Badge className={getLevelColor(selectedCourse.level)}>
                        {selectedCourse.level}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Прогресс курса</span>
                        <span className="font-semibold">{selectedCourse.progress}%</span>
                      </div>
                      <Progress value={selectedCourse.progress} className="h-2" />
                    </div>
                  </CardContent>
                </Card>

                <Tabs defaultValue="lessons" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="lessons">
                      <Icon name="PlayCircle" size={18} className="mr-2" />
                      Уроки
                    </TabsTrigger>
                    <TabsTrigger value="quiz">
                      <Icon name="ClipboardCheck" size={18} className="mr-2" />
                      Тесты
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="lessons" className="space-y-4">
                    {lessons.map((lesson, index) => (
                      <Card
                        key={lesson.id}
                        className={`cursor-pointer transition-all hover:shadow-md ${
                          currentLesson === index ? 'ring-2 ring-primary' : ''
                        }`}
                        onClick={() => setCurrentLesson(index)}
                      >
                        <CardContent className="flex items-center justify-between p-6">
                          <div className="flex items-center gap-4">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              lesson.completed ? 'bg-green-100' : 'bg-gray-100'
                            }`}>
                              {lesson.completed ? (
                                <Icon name="CheckCircle2" size={20} className="text-green-600" />
                              ) : (
                                <Icon name="Circle" size={20} className="text-gray-400" />
                              )}
                            </div>
                            <div>
                              <h3 className="font-semibold">{lesson.title}</h3>
                              <p className="text-sm text-muted-foreground">{lesson.duration}</p>
                            </div>
                          </div>
                          <Button size="sm">
                            {lesson.completed ? 'Повторить' : 'Начать'}
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </TabsContent>

                  <TabsContent value="quiz">
                    {!quizActive ? (
                      <Card>
                        <CardHeader>
                          <CardTitle>Тест по модулю</CardTitle>
                          <CardDescription>
                            Проверьте свои знания по пройденному материалу
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid grid-cols-2 gap-4 text-center">
                            <div className="p-4 bg-muted rounded-lg">
                              <Icon name="FileQuestion" size={32} className="mx-auto mb-2 text-primary" />
                              <p className="text-2xl font-bold">{quizQuestions.length}</p>
                              <p className="text-sm text-muted-foreground">Вопросов</p>
                            </div>
                            <div className="p-4 bg-muted rounded-lg">
                              <Icon name="Timer" size={32} className="mx-auto mb-2 text-primary" />
                              <p className="text-2xl font-bold">10</p>
                              <p className="text-sm text-muted-foreground">Минут</p>
                            </div>
                          </div>
                          <Button className="w-full" size="lg" onClick={handleStartQuiz}>
                            <Icon name="Play" size={20} className="mr-2" />
                            Начать тест
                          </Button>
                        </CardContent>
                      </Card>
                    ) : quizCompleted ? (
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-center">Тест завершен!</CardTitle>
                        </CardHeader>
                        <CardContent className="text-center space-y-6">
                          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-primary text-white">
                            <span className="text-3xl font-bold">
                              {Math.round((quizScore / quizQuestions.length) * 100)}%
                            </span>
                          </div>
                          <div>
                            <p className="text-2xl font-semibold mb-2">
                              {quizScore} из {quizQuestions.length} правильных ответов
                            </p>
                            <p className="text-muted-foreground">
                              {quizScore === quizQuestions.length
                                ? 'Отличный результат! 🎉'
                                : quizScore >= quizQuestions.length / 2
                                ? 'Хороший результат! 👍'
                                : 'Попробуйте еще раз 💪'}
                            </p>
                          </div>
                          <div className="flex gap-4 justify-center">
                            <Button onClick={handleRestartQuiz}>
                              <Icon name="RotateCcw" size={18} className="mr-2" />
                              Пройти снова
                            </Button>
                            <Button variant="outline" onClick={() => setQuizActive(false)}>
                              Закрыть
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ) : (
                      <Card>
                        <CardHeader>
                          <div className="flex justify-between items-center">
                            <CardTitle>Вопрос {currentQuestion + 1} из {quizQuestions.length}</CardTitle>
                            <Badge variant="outline">
                              {Math.round(((currentQuestion + 1) / quizQuestions.length) * 100)}%
                            </Badge>
                          </div>
                          <Progress value={((currentQuestion + 1) / quizQuestions.length) * 100} className="h-2" />
                        </CardHeader>
                        <CardContent className="space-y-6">
                          <h3 className="text-xl font-semibold">
                            {quizQuestions[currentQuestion].question}
                          </h3>
                          <div className="space-y-3">
                            {quizQuestions[currentQuestion].options.map((option, index) => (
                              <button
                                key={index}
                                onClick={() => handleAnswerSelect(index)}
                                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                                  selectedAnswer === index
                                    ? 'border-primary bg-primary/5'
                                    : 'border-border hover:border-primary/50'
                                }`}
                              >
                                <div className="flex items-center gap-3">
                                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                                    selectedAnswer === index ? 'border-primary bg-primary' : 'border-border'
                                  }`}>
                                    {selectedAnswer === index && (
                                      <Icon name="Check" size={16} className="text-white" />
                                    )}
                                  </div>
                                  <span>{option}</span>
                                </div>
                              </button>
                            ))}
                          </div>
                          <Button
                            className="w-full"
                            size="lg"
                            onClick={handleNextQuestion}
                            disabled={selectedAnswer === null}
                          >
                            {currentQuestion < quizQuestions.length - 1 ? 'Следующий вопрос' : 'Завершить тест'}
                          </Button>
                        </CardContent>
                      </Card>
                    )}
                  </TabsContent>
                </Tabs>
              </div>
            ) : (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {myCourses.map(course => (
                    <Card
                      key={course.id}
                      className="hover:shadow-lg transition-shadow cursor-pointer"
                      style={{ transform: 'scale(1)', transition: 'transform 0.2s' }}
                      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                      onClick={() => setSelectedCourse(course)}
                    >
                      <CardHeader>
                        <div className="flex justify-between items-start mb-2">
                          <Badge className={getLevelColor(course.level)}>
                            {course.level}
                          </Badge>
                          <Badge variant="outline">{course.technology}</Badge>
                        </div>
                        <CardTitle className="text-xl">{course.title}</CardTitle>
                        <CardDescription>{course.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2 mb-4">
                          <div className="flex justify-between text-sm">
                            <span>Прогресс</span>
                            <span className="font-semibold">{course.progress}%</span>
                          </div>
                          <Progress value={course.progress} className="h-2" />
                        </div>
                        <Button className="w-full">
                          Продолжить обучение
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
                  <CardContent className="flex flex-col md:flex-row items-center justify-between p-8 gap-4">
                    <div>
                      <h3 className="text-2xl font-bold mb-2">Готовы к новым знаниям?</h3>
                      <p className="text-muted-foreground">Выберите курс из каталога и начните обучение</p>
                    </div>
                    <Button size="lg" onClick={() => setActiveTab('catalog')}>
                      <Icon name="Plus" size={20} className="mr-2" />
                      Добавить курс
                    </Button>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        )}
      </main>

      <footer className="border-t mt-16 py-8 bg-muted/30">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2024 CodeLearn. Образовательная платформа для программистов</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
