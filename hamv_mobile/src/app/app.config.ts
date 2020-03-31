export interface AppConfig {
  appEngine: {
    solutionHost: string,
    productHost: string,
  };
  mixpanel: {
    token: string,
  };
  hockeyApp: {
    ids: {
      android: string,
      ios: string,
    }
  };
  app: {
    group: {
      max: number,
      devices: number,
    },
    schedule: {
      max: number,
    },
    support: {
      email: string,
    },
    disableLog?: boolean;
    logConfig: {
      recordLimit?: number,
    }
    theme: {
      primaryColor: string,
      productName: string,
      wifiName: string,
    },
    amazonAlexa: {
      skillName: string,
    },
    ifttt: {
      actionName: string,
    },
    googleHome: {
      ghName: string,
    },
  };
}

export const appConfig: AppConfig = {
  appEngine: {
    solutionHost: 'sampo.apps.exosite.io',
    productHost: 'y7zkobc5mcsc0000.m2.exosite.io:443',
  },
  mixpanel: {
    token: 'YOUR_TOKEN',
  },
  hockeyApp: {
    ids: {
      android: '',
      ios: '',
    }
  },
  app: {
    group: {
      max: 10, // Max group per user
      devices: 10, //Max device number per group
    },
    schedule: {
      max: 10, // Max schedule number per device
    },
    support: {
      email: '',
    },
    disableLog: false,
    logConfig: {
      recordLimit: 10000,
    },
    theme: {
      primaryColor: '#00baff',
      productName: 'Product Name',
      wifiName: 'WifiName-XXXX',
    },
    amazonAlexa: {
      skillName: 'skill-name',
    },
    ifttt: {
      actionName: 'ifttt_name',
    },
    googleHome: {
      ghName: 'gh_name',
    },
  }
};
