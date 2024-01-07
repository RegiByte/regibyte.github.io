import miniAvatar from '../assets/images/avatar.png';
import flowFieldPhoto from '../assets/images/effects/flow-field.png';
import matrixPhoto from '../assets/images/effects/matrix.png'
import aeStudioLogo from '../assets/images/logos/ae-studio.png';
import trimbleLogo from '../assets/images/logos/trimble.svg';
import pdv365Logo from '../assets/images/logos/pdv365.jpg';

type PhotoItem =
  | string
  | {
      picture: string;
      title: string;
      url: string;
    };

interface ResumeItem {
  company: string;
  title: string;
  logo: string;
  start:
    | string
    | {
        label: string;
        dateTime: number;
      };
  end:
    | string
    | {
        label: string;
        dateTime: number;
      };
}

export interface Dude {
  avatar: {
    mini: string;
  };
  nav: { label: string; path: string }[];
  social: Record<string, string>;
  home: {
    titles: string;
    bio: string;
    photos: PhotoItem[];
    resume: ResumeItem[];
  };
}

export const dude: Dude = {
  avatar: {
    mini: miniAvatar.src,
  },
  nav: [
    // {
    //   label: 'About',
    //   path: '/about'
    // },
    {
      label: 'Articles',
      path: '/articles',
    },
    // {
    //   label: 'Projects',
    //   path: '/projects'
    // },
    {
      label: 'Tools',
      path: '/tools',
    },
    {
      label: 'Effects',
      path: '/effects',
    },
  ],
  social: {
    instagram: 'https://www.instagram.com/regibytes/',
    linkedin: 'https://www.linkedin.com/in/regibyte/',
    github: 'https://github.com/RegiByte',
  },
  home: {
    titles: 'Software developer, 3d artist, mentor.',
    bio: `I’m Reginaldo, a web developer, game dev and 3d illustrator based in Londrina
          City, Brazil. I’ve been working with development since I was 13 years old, now with more than 
          ${new Date().getFullYear() - 2014} years of experience, I have created dozens of projects that 
          are used by thousands of people in U.S and Brazil.
        `,
    photos: [
      'https://via.placeholder.com/256',
      {
        picture: flowFieldPhoto.src,
        url: '/effects/flow-field',
        title: 'Flow Field Effect',
      },
      {
        picture: matrixPhoto.src,
        url: '/effects/matrix',
        title: 'Matrix Effect',
      },
      'https://via.placeholder.com/256',
      'https://via.placeholder.com/256',
    ],
    resume: [
      {
        company: 'AE Studio',
        title: 'Senior Full-Stack Dev',
        logo: aeStudioLogo.src,
        start: '2022',
        end: {
          label: 'Present',
          dateTime: new Date().getFullYear(),
        },
      },
      {
        company: 'Trimble Transportation',
        title: 'Senior Backend Dev',
        logo: trimbleLogo.src,
        start: '2020',
        end: '2022',
      },
      {
        company: 'PDV 365',
        title: 'React Dev',
        logo: pdv365Logo.src,
        start: '2019',
        end: '2020',
      },
    ],
  },
};
