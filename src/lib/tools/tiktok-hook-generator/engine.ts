import { ToolEngineResult } from '@/types/tool';

export type CreatorNiche = 'finance' | 'fitness' | 'tech' | 'beauty' | 'business' | 'lifestyle';
export type HookAngle = 'curiosity' | 'warning' | 'secret' | 'story' | 'urgency';

export interface ViralHookItem {
  id: string;
  hookText: string;
  category: string;
  visualCue: string;
  audioTip: string;
  estimatedRetentionRate: string;
}

const HOOK_TEMPLATES: Record<CreatorNiche, Record<HookAngle, { hook: string; visual: string; audio: string }[]>> = {
  finance: {
    curiosity: [
      {
        hook: "Here's the exact financial trick millionaires use that your bank will NEVER tell you.",
        visual: 'Hold up a credit card or point directly into camera with fast zoom.',
        audio: 'Low-frequency suspenseful synth beat.',
      },
      {
        hook: '99% of people have no idea this legal loophole saved me $4,200 in taxes.',
        visual: 'Green screen calculator or tax form behind you.',
        audio: 'Soft spoken voiceover, high clarity.',
      },
    ],
    warning: [
      {
        hook: 'Stop putting your money into a standard savings account. You are literally losing 4% a year.',
        visual: 'Shake head with dramatic text overlay "STOP DOING THIS".',
        audio: 'Urgent alarm or transition whoosh.',
      },
    ],
    secret: [
      {
        hook: '3 passive income streams that actually made me real money as a complete beginner.',
        visual: 'Countdown on fingers: 1, 2, 3 with pop-up screen screenshots.',
        audio: 'Upbeat Lo-Fi chill beat.',
      },
    ],
    story: [
      {
        hook: 'I was $28,000 in debt at age 22. Here is the single spreadsheet rule that fixed it.',
        visual: 'Authentic casual setup, walking outside or sitting at desk.',
        audio: 'Emotional piano or quiet storytelling track.',
      },
    ],
    urgency: [
      {
        hook: 'If you do not set this up before the end of this month, you will owe the IRS thousands.',
        visual: 'Calendar pointing, bold red text overlay.',
        audio: 'Ticking clock sound effect.',
      },
    ],
  },
  tech: {
    curiosity: [
      {
        hook: 'This free AI tool feels completely illegal to know, but top software engineers use it daily.',
        visual: 'Screen capture of rapid terminal or AI workflow in background.',
        audio: 'Cyberpunk synthwave or rapid keyboard clatter.',
      },
      {
        hook: 'Google does not want you to know this search trick exists.',
        visual: 'Typing into search bar with unexpected instant results.',
        audio: 'Subtle bass drop.',
      },
    ],
    warning: [
      {
        hook: 'Delete these 3 Chrome extensions right now before your private passwords get leaked.',
        visual: 'Pointing to browser toolbar with red warning boxes.',
        audio: 'Warning siren snippet.',
      },
    ],
    secret: [
      {
        hook: 'How to automate 90% of your daily computer work in under 10 minutes.',
        visual: 'Split screen showing hands off keyboard while tasks complete.',
        audio: 'Fast-paced rhythmic electronic track.',
      },
    ],
    story: [
      {
        hook: 'How I built a full web app in one weekend using modern tools with zero coding experience.',
        visual: 'Timelapse of code and live product.',
        audio: 'Inspiring indie-pop instrumental.',
      },
    ],
    urgency: [
      {
        hook: 'These 4 AI skills will replace junior developers within 12 months. Learn them now.',
        visual: 'Holding laptop or looking serious at webcam.',
        audio: 'Dramatic cinema hit.',
      },
    ],
  },
  fitness: {
    curiosity: [
      {
        hook: 'The 1 exercise personal trainers secretly avoid telling you about because it works too fast.',
        visual: 'Demonstrating posture with freeze-frame text highlight.',
        audio: 'Heavy gym phonk or trap beat.',
      },
    ],
    warning: [
      {
        hook: 'If you are doing 100 crunches a day to lose belly fat, you are completely wasting your time.',
        visual: 'Red X mark across conventional gym mistake.',
        audio: 'Buzzer error sound.',
      },
    ],
    secret: [
      {
        hook: 'Eat this 30 minutes before your workout to instantly lift 15% heavier.',
        visual: 'Holding pre-workout meal or natural ingredient.',
        audio: 'Energetic motivational track.',
      },
    ],
    story: [
      {
        hook: 'I worked out for 2 years with zero muscle gains until I changed this ONE routine.',
        visual: 'Before and after physique comparison photos side-by-side.',
        audio: 'Inspiring strings build-up.',
      },
    ],
    urgency: [
      {
        hook: 'Do this 5-minute morning routine every day this week and watch your lower back pain vanish.',
        visual: 'On yoga mat demonstrating exact spine stretch.',
        audio: 'Calm ambient acoustic guitar.',
      },
    ],
  },
  business: {
    curiosity: [
      {
        hook: 'The $0 marketing trick that made this brand $48,000 in its very first week on TikTok.',
        visual: 'Pointing to viral video analytics dashboard on phone.',
        audio: 'Catchy trending dance beat.',
      },
    ],
    warning: [
      {
        hook: 'Do not start an Etsy or Shopify store in 2026 until you understand this fee trap.',
        visual: 'Highlighting fee deductions on calculator.',
        audio: 'Suspense hit.',
      },
    ],
    secret: [
      {
        hook: '5 high-income remote skills you can master in 30 days for free on YouTube.',
        visual: 'Numbered text list appearing with finger snaps.',
        audio: 'Rhythmic finger-snap beat.',
      },
    ],
    story: [
      {
        hook: 'How I quit my 9-to-5 job by selling digital products with zero inventory.',
        visual: 'Working from coffee shop with laptop open.',
        audio: 'Lo-Fi acoustic chill.',
      },
    ],
    urgency: [
      {
        hook: 'This e-commerce niche is exploding right now and virtually nobody is talking about it.',
        visual: 'Google Trends upward graph overlay.',
        audio: 'Fast-paced tech beat.',
      },
    ],
  },
  beauty: {
    curiosity: [
      {
        hook: 'Dermatologists won’t tell you this $8 drugstore product outperforms $100 luxury serums.',
        visual: 'Holding product covering brand label until 3-second mark.',
        audio: 'Soft aesthetic bedroom pop.',
      },
    ],
    warning: [
      {
        hook: 'Stop applying your moisturizer this way—it is actually drying out your skin barrier.',
        visual: 'Close up on skin texture with macro lens.',
        audio: 'Gentle conversational voiceover.',
      },
    ],
    secret: [
      {
        hook: 'The French pharmacy skincare hack that clears stubborn forehead texture overnight.',
        visual: 'Morning routine bathroom mirror POV.',
        audio: 'Parisian cafe accordion or dreamy indie pop.',
      },
    ],
    story: [
      {
        hook: 'My skin barrier was ruined for 6 months. Here are the only 3 products that restored it.',
        visual: 'Showing gentle cleansers on bathroom counter.',
        audio: 'Calming rain & piano.',
      },
    ],
    urgency: [
      {
        hook: 'If your makeup starts separating by 2 PM, make this 1-step fix immediately.',
        visual: 'Beauty blender technique demonstration.',
        audio: 'Trending beauty tutorial instrumental.',
      },
    ],
  },
  lifestyle: {
    curiosity: [
      {
        hook: '3 psychology tricks that instantly make you more charismatic in any conversation.',
        visual: 'Eye contact into lens with confident posture.',
        audio: 'Smooth jazz / neo-soul groove.',
      },
    ],
    warning: [
      {
        hook: 'Most people realize this life lesson way too late in their 30s. Listen closely.',
        visual: 'Slow walking towards camera in natural light.',
        audio: 'Deep cinematic strings.',
      },
    ],
    secret: [
      {
        hook: 'How to fall asleep in under 2 minutes using the US Military breathing method.',
        visual: 'Lying in bed demonstrating 4-7-8 breathing tempo.',
        audio: 'Brown noise / soft rain sounds.',
      },
    ],
    story: [
      {
        hook: 'I deleted all social media apps from my phone for 30 days. Here is what happened to my brain.',
        visual: 'Showing empty home screen on smartphone.',
        audio: 'Pensive acoustic chords.',
      },
    ],
    urgency: [
      {
        hook: 'The 20-minute Sunday reset routine that makes your entire upcoming work week effortless.',
        visual: 'Speed cleaning / meal prep aesthetic B-roll.',
        audio: 'Bossa nova Sunday morning music.',
      },
    ],
  },
};

export function generateViralHooks(
  niche: CreatorNiche,
  topicKeyword?: string,
): ToolEngineResult<ViralHookItem[]> {
  const startTime = performance.now();
  const nicheData = HOOK_TEMPLATES[niche] || HOOK_TEMPLATES.finance;
  const list: ViralHookItem[] = [];

  const angles: HookAngle[] = ['curiosity', 'warning', 'secret', 'story', 'urgency'];

  let counter = 1;
  for (const angle of angles) {
    const items = nicheData[angle] || [];
    for (const item of items) {
      let text = item.hook;
      if (topicKeyword && topicKeyword.trim()) {
        text = text.replace(/(trick|tool|hack|product|skill|niche)/i, topicKeyword.trim());
      }

      list.push({
        id: `hook_${counter++}`,
        category: angle.toUpperCase(),
        hookText: text,
        visualCue: item.visual,
        audioTip: item.audio,
        estimatedRetentionRate: `${Math.floor(Math.random() * 8) + 88}%+`,
      });
    }
  }

  const endTime = performance.now();
  return {
    success: true,
    data: list,
    metrics: { processingTimeMs: Math.round((endTime - startTime) * 100) / 100 },
  };
}
