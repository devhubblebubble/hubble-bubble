"use client";

import { ReactNode } from "react";

import Header from "@/components/Header/Header";
import HeroSection from "@/components/HeroSection/HeroSection";
import ImpactSection from "@/components/ImpactSection";
import StatsSection from "@/components/StatsSection/Statssection";
import TestimonialSection from "@/components/TestimonialSection";
import StudentSuccessSection from "@/components/StudentSuccessSection";
import AppleWatchMenu from "@/components/AppleWatchMenu";
import JourneySection from "@/components/JourneySection";
import JourneySectionCountryGlobe from "@/components/JourneySection/JourneySectionCountryGlobe";
import JourneySectionLiveVisitorGlobe from "@/components/JourneySection/JourneySectionLiveVisitorGlobe";
import JourneySectionMainGlobeCountryHighlight from "@/components/JourneySection/JourneySectionMainGlobeCountryHighlight";
import JourneySectionStripeInspiredGlobe from "@/components/JourneySection/JourneySectionStripeInspiredGlobe";
import AdvancedCapabilitiesCard from "@/components/AdvancedCapabilitiesCard";
import GlowEllipse from "@/components/Effects/GlowEllipse";
import StarBackground from "@/components/Background/StarBackground";
import ShootingStars from "@/components/Background/ShootingStars";
import ParallaxStars from "@/components/Background/ParallaxStars";

export interface Variant {
  id: string;
  label: string;
  render: () => ReactNode;
  minHeight?: number;
}

export interface ComponentEntry {
  id: string;
  label: string;
  variants: Variant[];
}

export interface Category {
  id: string;
  label: string;
  items: ComponentEntry[];
}

export const registry: Category[] = [
  {
    id: "layout",
    label: "Layout",
    items: [
      {
        id: "header",
        label: "Header",
        variants: [
          {
            id: "default",
            label: "Default",
            render: () => (
              <div style={{ position: "relative", width: "100%" }}>
                <Header />
              </div>
            ),
          },
        ],
      },
    ],
  },
  {
    id: "hero",
    label: "Hero",
    items: [
      {
        id: "hero-section",
        label: "HeroSection",
        variants: [
          {
            id: "default",
            label: "Default",
            render: () => <HeroSection />,
            minHeight: 800,
          },
        ],
      },
    ],
  },
  {
    id: "content",
    label: "Content Sections",
    items: [
      {
        id: "impact-section",
        label: "ImpactSection",
        variants: [
          {
            id: "default",
            label: "Default",
            render: () => <ImpactSection />,
            minHeight: 600,
          },
        ],
      },
      {
        id: "stats-section",
        label: "StatsSection",
        variants: [
          {
            id: "default",
            label: "Default",
            render: () => <StatsSection />,
            minHeight: 500,
          },
        ],
      },
    ],
  },
  {
    id: "testimonials",
    label: "Testimonials",
    items: [
      {
        id: "testimonial-section",
        label: "TestimonialSection",
        variants: [
          {
            id: "default",
            label: "Default (Fade Carousel)",
            render: () => <TestimonialSection />,
            minHeight: 600,
          },
        ],
      },
      {
        id: "student-success-section",
        label: "StudentSuccessSection",
        variants: [
          {
            id: "default",
            label: "Default (Card Stack)",
            render: () => <StudentSuccessSection />,
            minHeight: 700,
          },
        ],
      },
    ],
  },
  {
    id: "interactive",
    label: "Interactive",
    items: [
      {
        id: "journey-section",
        label: "JourneySection",
        variants: [
          {
            id: "default",
            label: "Default (with Globe)",
            render: () => <JourneySection />,
            minHeight: 800,
          },
          {
            id: "country-highlights",
            label: "Country Highlights (Team Presence)",
            render: () => <JourneySectionCountryGlobe />,
            minHeight: 760,
          },
          {
            id: "live-visitor-intelligence",
            label: "Live Visitor Intelligence",
            render: () => <JourneySectionLiveVisitorGlobe />,
            minHeight: 760,
          },
          {
            id: "main-globe-country-highlights",
            label: "Main Globe + Country Highlights",
            render: () => <JourneySectionMainGlobeCountryHighlight />,
            minHeight: 760,
          },
          {
            id: "stripe-inspired-globe",
            label: "Stripe-Inspired Globe",
            render: () => <JourneySectionStripeInspiredGlobe />,
            minHeight: 760,
          },
        ],
      },
      {
        id: "apple-watch-menu",
        label: "AppleWatchMenu",
        variants: [
          {
            id: "default",
            label: "Default (Draggable Grid)",
            render: () => <AppleWatchMenu />,
            minHeight: 700,
          },
        ],
      },
    ],
  },
  {
    id: "cards",
    label: "Cards",
    items: [
      {
        id: "advanced-capabilities-card",
        label: "AdvancedCapabilitiesCard",
        variants: [
          {
            id: "default",
            label: "Default",
            render: () => <AdvancedCapabilitiesCard />,
            minHeight: 500,
          },
        ],
      },
    ],
  },
  {
    id: "effects",
    label: "Effects & Backgrounds",
    items: [
      {
        id: "glow-ellipse",
        label: "GlowEllipse",
        variants: [
          {
            id: "hero",
            label: "Hero Variant",
            render: () => (
              <div style={{ position: "relative", height: 300, width: "100%" }}>
                <GlowEllipse
                  variant="hero"
                  position={{ top: "50%", left: "50%" }}
                  size="large"
                />
              </div>
            ),
            minHeight: 300,
          },
          {
            id: "secondary",
            label: "Secondary Variant",
            render: () => (
              <div style={{ position: "relative", height: 300, width: "100%" }}>
                <GlowEllipse
                  variant="secondary"
                  position={{ top: "50%", left: "50%" }}
                  size="medium"
                />
              </div>
            ),
            minHeight: 300,
          },
          {
            id: "accent",
            label: "Accent Variant",
            render: () => (
              <div style={{ position: "relative", height: 300, width: "100%" }}>
                <GlowEllipse
                  variant="accent"
                  position={{ top: "50%", left: "50%" }}
                  size="small"
                />
              </div>
            ),
            minHeight: 300,
          },
        ],
      },
      {
        id: "star-background",
        label: "StarBackground",
        variants: [
          {
            id: "default",
            label: "Default",
            render: () => (
              <div
                style={{
                  position: "relative",
                  height: 400,
                  width: "100%",
                  background: "#0a0a0f",
                  overflow: "hidden",
                }}
              >
                <div style={{ position: "absolute", inset: 0 }}>
                  <StarBackground />
                </div>
              </div>
            ),
            minHeight: 400,
          },
          {
            id: "dense",
            label: "High Density",
            render: () => (
              <div
                style={{
                  position: "relative",
                  height: 400,
                  width: "100%",
                  background: "#0a0a0f",
                  overflow: "hidden",
                }}
              >
                <div style={{ position: "absolute", inset: 0 }}>
                  <StarBackground starDensity={0.0004} />
                </div>
              </div>
            ),
            minHeight: 400,
          },
        ],
      },
      {
        id: "shooting-stars",
        label: "ShootingStars",
        variants: [
          {
            id: "default",
            label: "Default",
            render: () => (
              <div
                style={{
                  position: "relative",
                  height: 400,
                  width: "100%",
                  background: "#0a0a0f",
                  overflow: "hidden",
                }}
              >
                <ShootingStars />
              </div>
            ),
            minHeight: 400,
          },
        ],
      },
      {
        id: "parallax-stars",
        label: "ParallaxStars",
        variants: [
          {
            id: "default",
            label: "Default (Mouse Parallax)",
            render: () => (
              <div
                style={{
                  position: "relative",
                  height: 500,
                  width: "100%",
                  overflow: "hidden",
                  background: "#0a0a0f",
                }}
              >
                <ParallaxStars />
              </div>
            ),
            minHeight: 500,
          },
          {
            id: "intense",
            label: "High Intensity",
            render: () => (
              <div
                style={{
                  position: "relative",
                  height: 500,
                  width: "100%",
                  overflow: "hidden",
                  background: "#0a0a0f",
                }}
              >
                <ParallaxStars starDensity={0.0004} sparkleProbability={0.18} />
              </div>
            ),
            minHeight: 500,
          },
          {
            id: "subtle",
            label: "Subtle & Smooth",
            render: () => (
              <div
                style={{
                  position: "relative",
                  height: 500,
                  width: "100%",
                  overflow: "hidden",
                  background: "#0a0a0f",
                }}
              >
                <ParallaxStars
                  starDensity={0.00008}
                  sparkleProbability={0.05}
                  twinkleProbability={0.45}
                  minTwinkleSpeed={0.8}
                  maxTwinkleSpeed={1.4}
                />
              </div>
            ),
            minHeight: 500,
          },
        ],
      },
    ],
  },
];

export function findVariant(
  categoryId: string,
  componentId: string,
  variantId: string
): { category: Category; component: ComponentEntry; variant: Variant } | null {
  const category = registry.find((c) => c.id === categoryId);
  if (!category) return null;
  const component = category.items.find((i) => i.id === componentId);
  if (!component) return null;
  const variant = component.variants.find((v) => v.id === variantId);
  if (!variant) return null;
  return { category, component, variant };
}

export function getDefaultSelection(): {
  categoryId: string;
  componentId: string;
  variantId: string;
} {
  const first = registry[0];
  const firstItem = first.items[0];
  const firstVariant = firstItem.variants[0];
  return {
    categoryId: first.id,
    componentId: firstItem.id,
    variantId: firstVariant.id,
  };
}
