import type React from 'react';
import { Link } from 'expo-router';
import type { StyleProp, TextStyle } from 'react-native';

interface ExternalLinkProps {
  href: string;
  style?: StyleProp<TextStyle>;
  children: React.ReactNode;
}

export function ExternalLink({ href, style, children }: ExternalLinkProps) {
  return (
    <Link href={href as any} style={style}>
      {children}
    </Link>
  );
}
