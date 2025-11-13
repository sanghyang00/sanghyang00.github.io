// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "About",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-publications",
          title: "Publications",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/publications/";
          },
        },{id: "nav-cv",
          title: "CV",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/cv/";
          },
        },{id: "nav-more-about-me",
          title: "More About Me",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/more-about-me/";
          },
        },{id: "books-the-godfather",
          title: 'The Godfather',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/the_godfather/";
            },},{id: "hobbies-concert-going",
          title: 'Concert Going',
          description: "",
          section: "Hobbies",handler: () => {
              window.location.href = "/hobbies/concerts/";
            },},{id: "hobbies-fashion-amp-style",
          title: 'Fashion &amp;amp; Style',
          description: "",
          section: "Hobbies",handler: () => {
              window.location.href = "/hobbies/fashion/";
            },},{id: "hobbies-jogging",
          title: 'Jogging',
          description: "",
          section: "Hobbies",handler: () => {
              window.location.href = "/hobbies/jogging/";
            },},{id: "hobbies-music-listening",
          title: 'Music Listening',
          description: "",
          section: "Hobbies",handler: () => {
              window.location.href = "/hobbies/music_listening/";
            },},{id: "news-attended-icassp-2024-in-seoul-as-my-first-major-academic-conference-it-was-an-inspiring-experience-to-meet-leading-researchers-and-see-the-latest-advancements-in-our-field",
          title: '✨ Attended ICASSP 2024 in Seoul. As my first major academic conference, it...',
          description: "",
          section: "News",},{id: "news-my-first-first-author-paper-lama-ut-has-been-accepted-to-aaai-2025-a-huge-thanks-to-all-my-co-authors-for-their-support-and-collaboration",
          title: '🚀 My first first-author paper, LAMA-UT, has been accepted to AAAI 2025! A...',
          description: "",
          section: "News",},{id: "news-i-presented-our-paper-lama-ut-language-agnostic-multilingual-asr-through-orthography-unification-and-language-specific-transliteration-at-aaai-2025-in-philadelphia-pennsylvania-usa-as-an-oral-presentation-it-was-a-tremendous-honor-to-deliver-my-first-first-author-paper-as-an-oral-talk",
          title: '🎤 I presented our paper, “LAMA-UT: Language Agnostic Multilingual ASR through Orthography Unification...',
          description: "",
          section: "News",},{id: "news-my-second-first-author-paper-unicom-has-been-accepted-to-emnlp-2025-a-huge-thanks-to-all-my-co-authors-for-their-support-and-collaboration",
          title: '🚀 My second first-author paper, UniCoM, has been accepted to EMNLP 2025! A...',
          description: "",
          section: "News",},{id: "news-i-presented-our-paper-unicom-a-universal-code-switching-speech-generator-at-emnlp-2025-in-suzhou-china-it-was-a-tremendous-honor-to-deliver-my-presentation-and-i-m-truly-grateful-for-the-opportunity-to-share-our-work-with-such-an-inspiring-community",
          title: '🎤 I presented our paper, “UniCoM: A Universal Code-Switching Speech Generator”, at EMNLP...',
          description: "",
          section: "News",},{id: "projects-project-1",
          title: 'project 1',
          description: "with background image",
          section: "Projects",handler: () => {
              window.location.href = "/projects/1_project/";
            },},{id: "projects-project-2",
          title: 'project 2',
          description: "a project with a background image and giscus comments",
          section: "Projects",handler: () => {
              window.location.href = "/projects/2_project/";
            },},{id: "projects-project-3-with-very-long-name",
          title: 'project 3 with very long name',
          description: "a project that redirects to another website",
          section: "Projects",handler: () => {
              window.location.href = "/projects/3_project/";
            },},{id: "projects-project-4",
          title: 'project 4',
          description: "another without an image",
          section: "Projects",handler: () => {
              window.location.href = "/projects/4_project/";
            },},{id: "projects-project-5",
          title: 'project 5',
          description: "a project with a background image",
          section: "Projects",handler: () => {
              window.location.href = "/projects/5_project/";
            },},{id: "projects-project-6",
          title: 'project 6',
          description: "a project with no image",
          section: "Projects",handler: () => {
              window.location.href = "/projects/6_project/";
            },},{id: "projects-project-7",
          title: 'project 7',
          description: "with background image",
          section: "Projects",handler: () => {
              window.location.href = "/projects/7_project/";
            },},{id: "projects-project-8",
          title: 'project 8',
          description: "an other project with a background image and giscus comments",
          section: "Projects",handler: () => {
              window.location.href = "/projects/8_project/";
            },},{id: "projects-project-9",
          title: 'project 9',
          description: "another project with an image 🎉",
          section: "Projects",handler: () => {
              window.location.href = "/projects/9_project/";
            },},{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
