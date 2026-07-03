import { formatDate, truncateText, getInitials, cn } from '@/lib/utils/helpers';

describe('Helper Functions', () => {
  describe('formatDate', () => {
    it('formats date correctly', () => {
      const date = new Date('2024-01-15T10:30:00');
      expect(formatDate(date)).toMatch(/Jan 15, 2024/);
    });
  });

  describe('truncateText', () => {
    it('truncates text that exceeds max length', () => {
      const text = 'This is a long text that needs truncation';
      expect(truncateText(text, 10)).toBe('This is a ...');
    });

    it('returns original text if within max length', () => {
      const text = 'Short text';
      expect(truncateText(text, 20)).toBe('Short text');
    });
  });

  describe('getInitials', () => {
    it('returns initials from name', () => {
      expect(getInitials('John Doe')).toBe('JD');
      expect(getInitials('Jane Smith')).toBe('JS');
    });
  });

  describe('cn', () => {
    it('merges class names correctly', () => {
      expect(cn('class1', 'class2', { class3: true })).toBe('class1 class2 class3');
      expect(cn('class1', { class2: false })).toBe('class1');
    });
  });
});
