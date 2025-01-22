import React from 'react';
import { BaseProps } from '@/types/common';
import ProjectFeedSection from '../ProjectFeedSection';

interface Project {
  title?: string;
  description?: string;
  image?: string;
}

interface FeaturedProjectsSectionProps extends BaseProps {
  title?: string;
  projects?: Project[];
}

export default function FeaturedProjectsSection(props: FeaturedProjectsSectionProps) {
  return <ProjectFeedSection {...props} />;
}
