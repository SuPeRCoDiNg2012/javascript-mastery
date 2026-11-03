import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { AppShell } from '@/components/layout/AppShell';
import { Gate, Page } from './route-elements';

const Home = lazy(() => import('@/pages/Home'));
const CoursePage = lazy(() => import('@/pages/CoursePage'));
const WeekPage = lazy(() => import('@/pages/WeekPage'));
const LessonPage = lazy(() => import('@/pages/LessonPage'));
const WeekTestPage = lazy(() => import('@/pages/WeekTestPage'));
const ReviewPage = lazy(() => import('@/pages/ReviewPage'));
const StatsPage = lazy(() => import('@/pages/StatsPage'));
const SettingsPage = lazy(() => import('@/pages/SettingsPage'));
const AuthPage = lazy(() => import('@/pages/AuthPage'));
const OnboardingPage = lazy(() => import('@/pages/OnboardingPage'));
const NotFound = lazy(() => import('@/pages/NotFound'));

export const router = createBrowserRouter(
  [
  {
    path: '/onboarding',
    element: (
      <Page>
        <OnboardingPage />
      </Page>
    ),
  },
  {
    path: '/auth',
    element: (
      <Page>
        <AuthPage />
      </Page>
    ),
  },
  {
    element: <Gate />,
    children: [
      {
        element: <AppShell />,
        children: [
          { index: true, element: <Page><Home /></Page> },
          { path: 'course', element: <Page><CoursePage /></Page> },
          { path: 'week/:weekId', element: <Page><WeekPage /></Page> },
          { path: 'week/:weekId/test', element: <Page><WeekTestPage /></Page> },
          { path: 'lesson/:lessonId', element: <Page><LessonPage /></Page> },
          { path: 'review', element: <Page><ReviewPage /></Page> },
          { path: 'stats', element: <Page><StatsPage /></Page> },
          { path: 'settings', element: <Page><SettingsPage /></Page> },
          { path: '*', element: <Page><NotFound /></Page> },
        ],
      },
    ],
  },
  ],
  { future: { v7_relativeSplatPath: true } },
);
