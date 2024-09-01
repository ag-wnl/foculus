import { atomWithStorage } from 'jotai/utils'

export const globalTheme = atomWithStorage<'light' | 'dark'>('global_theme', 'dark');

export const recentChats = atomWithStorage<string[]>('recent_chat_messages', []);