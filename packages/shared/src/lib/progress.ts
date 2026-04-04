export interface LessonProgress {
  completedAt: string;
  quizScore?: number;
}

export interface CategoryProgress {
  lessons: Record<string, LessonProgress>;
}

export interface UserProgress {
  categories: Record<string, CategoryProgress>;
  finalExamScore?: number;
  finalExamDate?: string;
  userName?: string;
}

export function createProgressManager(storageKey: string) {
  function getProgress(): UserProgress {
    if (typeof window === "undefined") return { categories: {} };
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) return JSON.parse(stored);
    } catch {
      // corrupted data
    }
    return { categories: {} };
  }

  function saveProgress(progress: UserProgress) {
    if (typeof window === "undefined") return;
    localStorage.setItem(storageKey, JSON.stringify(progress));
  }

  return {
    markLessonComplete(categoryId: string, lessonId: string, quizScore?: number) {
      const progress = getProgress();
      if (!progress.categories[categoryId]) {
        progress.categories[categoryId] = { lessons: {} };
      }
      progress.categories[categoryId].lessons[lessonId] = {
        completedAt: new Date().toISOString(),
        quizScore,
      };
      saveProgress(progress);
    },

    isLessonComplete(categoryId: string, lessonId: string): boolean {
      const progress = getProgress();
      return !!progress.categories[categoryId]?.lessons[lessonId];
    },

    getLessonProgress(categoryId: string, lessonId: string): LessonProgress | null {
      const progress = getProgress();
      return progress.categories[categoryId]?.lessons[lessonId] || null;
    },

    getCategoryCompletionCount(categoryId: string, totalLessons: number) {
      const progress = getProgress();
      const completed = Object.keys(progress.categories[categoryId]?.lessons || {}).length;
      return {
        completed,
        total: totalLessons,
        percent: totalLessons > 0 ? Math.round((completed / totalLessons) * 100) : 0,
      };
    },

    isCategoryComplete(categoryId: string, totalLessons: number): boolean {
      const { completed, total } = this.getCategoryCompletionCount(categoryId, totalLessons);
      return completed >= total && total > 0;
    },

    getOverallProgress(categoriesWithCounts: Array<{ id: string; lessonCount: number }>) {
      let completedLessons = 0;
      let totalLessons = 0;
      let completedCategories = 0;

      for (const cat of categoriesWithCounts) {
        const { completed, total } = this.getCategoryCompletionCount(cat.id, cat.lessonCount);
        completedLessons += completed;
        totalLessons += total;
        if (completed >= total && total > 0) completedCategories++;
      }

      return {
        completedLessons,
        totalLessons,
        completedCategories,
        totalCategories: categoriesWithCounts.length,
        percent: totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0,
      };
    },

    saveFinalExamScore(score: number) {
      const progress = getProgress();
      progress.finalExamScore = score;
      progress.finalExamDate = new Date().toISOString();
      saveProgress(progress);
    },

    getFinalExamResult(): { score: number; date: string } | null {
      const progress = getProgress();
      if (progress.finalExamScore !== undefined && progress.finalExamDate) {
        return { score: progress.finalExamScore, date: progress.finalExamDate };
      }
      return null;
    },

    setUserName(name: string) {
      const progress = getProgress();
      progress.userName = name;
      saveProgress(progress);
    },

    getUserName(): string {
      return getProgress().userName || "";
    },

    resetAllProgress() {
      if (typeof window === "undefined") return;
      localStorage.removeItem(storageKey);
    },
  };
}
