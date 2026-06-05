import { useId, useState } from 'react'
import type { ComponentLayoutProps } from '../../shared/layout'
import {
  categoryStyle,
  getResponsiveStyles,
  getRootStyle,
  hoverFallbackStyle,
  imageBaseStyle,
  imageFallbackStyle,
  mediaWrapStyle,
  metaStyle,
  metaTextStyle,
} from './ProjectCard.styles'

export interface ProjectCardImage {
  src: string
  alt?: string
}

export interface ProjectCardLink {
  href: string
  target?: string
  preload?: string
}

export interface ProjectCardProps extends ComponentLayoutProps {
  projectTitle?: string
  clientName?: string
  category?: string
  image?: ProjectCardImage
  hoverImage?: ProjectCardImage
  link?: ProjectCardLink
  className?: string
  width?: number
  tabletWidth?: number
  mobileWidth?: number
  imageHeight?: number
  tabletImageHeight?: number
  mobileImageHeight?: number
  metaGap?: number
  tabletMetaGap?: number
  mobileMetaGap?: number
}

export function ProjectCard({
  category = '(Categories)',
  className = '',
  clientName = 'Client Name',
  hoverImage,
  image,
  imageHeight = 520,
  link,
  metaGap = 10,
  mobileImageHeight,
  mobileMetaGap,
  mobileWidth,
  projectTitle = 'Project Title',
  tabletImageHeight,
  tabletMetaGap,
  tabletWidth,
  width = 520,
  ...layoutProps
}: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const instanceId = useId().replace(/[^a-zA-Z0-9_-]/g, '')
  const rootStyle = getRootStyle(layoutProps)
  const responsiveStyles = getResponsiveStyles({
    desktopImageHeight: imageHeight,
    desktopMetaGap: metaGap,
    desktopWidth: width,
    instanceId,
    mobileImageHeight: mobileImageHeight ?? tabletImageHeight ?? imageHeight,
    mobileMetaGap: mobileMetaGap ?? tabletMetaGap ?? metaGap,
    mobileWidth: mobileWidth ?? tabletWidth ?? width,
    tabletImageHeight: tabletImageHeight ?? imageHeight,
    tabletMetaGap: tabletMetaGap ?? metaGap,
    tabletWidth: tabletWidth ?? width,
  })
  const rootClassName = ['acg-project-card', className].filter(Boolean).join(' ')
  const commonLinkProps = {
    'aria-label': `${projectTitle} - ${clientName}`,
    className: rootClassName,
    'data-acg-project-card': instanceId,
    onMouseEnter: () => setIsHovered(true),
    onMouseLeave: () => setIsHovered(false),
    rel: link?.target === '_blank' ? 'noreferrer' : undefined,
    style: rootStyle,
    target: link?.target,
  }

  return (
    <a {...commonLinkProps} href={link?.href}>
      <style>{responsiveStyles}</style>
      <span className="acg-project-card__media" style={mediaWrapStyle}>
        {image?.src ? (
          <img
            alt={image.alt ?? projectTitle}
            src={image.src}
            style={{
              ...imageBaseStyle,
              opacity: isHovered && hoverImage?.src ? 0 : 1,
              transform: isHovered ? 'scale(1.035)' : 'scale(1)',
            }}
          />
        ) : (
          <span
            aria-hidden="true"
            style={{
              ...imageFallbackStyle,
              opacity: isHovered && hoverImage?.src ? 0 : 1,
              transform: isHovered ? 'scale(1.035)' : 'scale(1)',
            }}
          />
        )}
        {hoverImage?.src ? (
          <img
            alt={hoverImage.alt ?? ''}
            src={hoverImage.src}
            style={{
              ...imageBaseStyle,
              opacity: isHovered ? 1 : 0,
              transform: isHovered ? 'scale(1)' : 'scale(1.035)',
            }}
          />
        ) : (
          <span
            aria-hidden="true"
            style={{
              ...hoverFallbackStyle,
              opacity: isHovered ? 1 : 0,
              transform: isHovered ? 'scale(1)' : 'scale(1.035)',
            }}
          />
        )}
      </span>
      <span className="acg-project-card__meta" style={metaStyle}>
        <span style={metaTextStyle}>{projectTitle}</span>
        <span style={metaTextStyle}>{clientName}</span>
        <span style={categoryStyle}>{category}</span>
      </span>
    </a>
  )
}
