export const rasModel = {
  "familyName": "Commercial",
  "familyMembers": [
    "RAS.*"
  ],
  "images": {
    "thumbnail": { "uri": "thumbnailUrl" },
    "banner": { "uri": "bannerUrl" },
  },
  "chartLayout": {
    "main": ["EXAMPLE_LINE_CHART"]
  },
  "chartComponents": {
    "EXAMPLE_LINE_CHART": {
      "type": "line-chart",
      "title": "Temperature",
      "models": [{
        "key": "H00",
        "values": [{
            "value": 0,
            "text": "INFORMATION_MODEL.OFF"
          },
          {
            "value": 1,
            "text": "INFORMATION_MODEL.ON"
          }
        ]
      }],
      "options": {
      }
    },
    "EXAMPLE_BAR_CHART": {
      "type": "bar-chart",
      "title": "Humidity",
      "models": [{
        "key": "H03",
        "default": 25
      }],
      "options": {
      }
    }
  },
  "controlLayout": {
    "primary": [
      "AC_POWER_AND_TEMP"
    ],
    "secondary": [
      "AC_MODE",
      "AC_FAN_SPEED_FOR_COMMERCIAL",
      "AC_TIMER",
      "AC_HORIZONTAL_SWING",
      "AC_VERTICAL_SWING",
      "AC_MOISTURE",
      "AC_MOLD_DETECTION",
      "AC_BRIGHTNESS",
      "AC_BEEP"
    ]
  },
  "scheduleLayout": {
    "primary": [
      "AC_TEMP",
      "AC_MODE",
      "AC_FAN_SPEED_FOR_COMMERCIAL",
      "AC_HORIZONTAL_SWING",
      "AC_VERTICAL_SWING",
      "AC_MOISTURE",
      "AC_MOLD_DETECTION",
    ],
    "secondary": [
      "AC_BRIGHTNESS",
      "AC_BEEP"
    ]
  },
  "deviceId": 1,
  "components": {
    "AC_POWER_AND_TEMP": {
      "type": "large-toggle-with-range",
      "title": "",
      "models": [{
        "key": "H03",
        "values": {
          "min": 16,
          "max": 32,
          "step": 1,
          "func": "tempCelsius"
        },
        "disable": [{
          "conditions": [{
            "key": "H00",
            "op": "eq",
            "target": 0
          }]
        }, {
          "conditions": [{
            "key": "H01",
            "op": "gte",
            "target": 2
          }, {
            "key": "H01",
            "op": "lte",
            "target": 3
          }]
        }, {
          "conditions": [{
            "key": "H29",
            "op": "gt",
            "target": 0
          }]
        }]
      }, {
        "key": "H00",
        "values": [{
          "value": 0,
          "text": "INFORMATION_MODEL.OFF"
        },
        {
          "value": 1,
          "text": "INFORMATION_MODEL.ON"
        }
        ],
        "disable": [{
          "conditions": [{
            "key": "H29",
            "op": "gt",
            "target": 0
          }]
        }]
      }]
    },
    "AC_POWER": {
      "type": "toggle",
      "title": "INFORMATION_MODEL.POWER",
      "models": [{
        "key": "H00",
        "values": [{
          "value": 0,
          "text": "INFORMATION_MODEL.OFF"
        },
        {
          "value": 1,
          "text": "INFORMATION_MODEL.ON"
        }
        ],
        "disable": [{
          "conditions": [{
            "key": "H29",
            "op": "gt",
            "target": 0
          }]
        }]
      }]
    },
    "AC_TEMP": {
      "type": "range",
      "title": "INFORMATION_MODEL.TEMPERATURE",
      "models": [{
        "key": "H03",
        "values": {
          "min": 16,
          "max": 32,
          "step": 1,
          "func": "tempCelsius"
        },
        "disable": [{
          "conditions": [{
            "key": "H00",
            "op": "eq",
            "target": 0
          }]
        }, {
          "conditions": [{
            "key": "H01",
            "op": "gte",
            "target": 2
          }, {
            "key": "H01",
            "op": "lte",
            "target": 3
          }]
        }, {
          "conditions": [{
            "key": "H29",
            "op": "gt",
            "target": 0
          }]
        }]
      }]
    },
    "AC_TEMP_FOR_BUSINESS": {
      "type": "range",
      "title": "INFORMATION_MODEL.TEMPERATURE",
      "models": [{
        "key": "H03",
        "values": {
          "min": 19,
          "max": 30,
          "step": 1,
          "func": "tempCelsius"
        },
        "dependency": [{
          "conditions": [{
            "key": "H01",
            "op": "eq",
            "target": 4
          }],
          "result": {
            "values": {
              "min": 17,
              "max": 30,
              "step": 1,
              "func": "tempCelsius"
            }
          }
        }],
        "disable": [{
          "conditions": [{
            "key": "H00",
            "op": "eq",
            "target": 0
          }]
        }, {
          "conditions": [{
            "key": "H29",
            "op": "gt",
            "target": 0
          }]
        }]
      }]
    },
    "AC_MODE": {
      "type": "button-group",
      "title": "INFORMATION_MODEL.AC_MODE",
      "models": [{
        "key": "H01",
        "values": [{
          "value": 3,
          "text": "INFORMATION_MODEL.AUTO"
        }, {
          "value": 0,
          "text": "INFORMATION_MODEL.COOL"
        },
        {
          "value": 4,
          "text": "INFORMATION_MODEL.HEAT"
        },
        {
          "value": 2,
          "text": "INFORMATION_MODEL.FAN"
        },
        {
          "value": 1,
          "text": "INFORMATION_MODEL.DEHUMIDIFIER"
        }
        ],
        "disable": [{
          "conditions": [{
            "key": "H00",
            "op": "eq",
            "target": 0
          }]
        }, {
          "conditions": [{
            "key": "H29",
            "op": "gt",
            "target": 0
          }]
        }]
      }]
    },
    "AC_MODE_FOR_AC_ONLY": {
      "type": "button-group",
      "title": "INFORMATION_MODEL.AC_MODE",
      "models": [{
        "key": "H01",
        "values": [{
          "value": 3,
          "text": "INFORMATION_MODEL.AUTO"
        },
        {
          "value": 0,
          "text": "INFORMATION_MODEL.COOL"
        }
        ],
        "disable": [{
          "conditions": [{
            "key": "H00",
            "op": "eq",
            "target": 0
          }]
        }, {
          "conditions": [{
            "key": "H29",
            "op": "gt",
            "target": 0
          }]
        }]
      }]
    },
    "AC_FAN_SPEED_FOR_COMMERCIAL": {
      "type": "button-group",
      "title": "INFORMATION_MODEL.FAN_SPEED",
      "models": [{
        "key": "H02",
        "values": [{
          "value": 0,
          "text": "INFORMATION_MODEL.AUTO"
        },
        {
          "value": 1,
          "text": "INFORMATION_MODEL.SILENT"
        },
        {
          "value": 2,
          "text": "INFORMATION_MODEL.WEAK"
        },
        {
          "value": 3,
          "text": "INFORMATION_MODEL.LOW"
        },
        {
          "value": 4,
          "text": "INFORMATION_MODEL.HIGH"
        }
        ],
        "dependency": [{
          "conditions": [{
            "key": "H01",
            "op": "eq",
            "target": 1
          }],
          "result": {
            "values": [{
              "value": 1,
              "text": "INFORMATION_MODEL.SILENT"
            },
            {
              "value": 2,
              "text": "INFORMATION_MODEL.WEAK"
            }
            ]
          }
        }, {
          "conditions": [{
            "key": "H01",
            "op": "eq",
            "target": 2
          }],
          "result": {
            "values": [{
              "value": 1,
              "text": "INFORMATION_MODEL.SILENT"
            },
            {
              "value": 2,
              "text": "INFORMATION_MODEL.WEAK"
            },
            {
              "value": 3,
              "text": "INFORMATION_MODEL.LOW"
            },
            {
              "value": 4,
              "text": "INFORMATION_MODEL.HIGH"
            }
            ]
          }
        }, {
          "conditions": [{
            "key": "H01",
            "op": "eq",
            "target": 3
          }],
          "result": {
            "values": [{
              "value": 0,
              "text": "INFORMATION_MODEL.AUTO"
            },
            {
              "value": 1,
              "text": "INFORMATION_MODEL.SILENT"
            },
            {
              "value": 2,
              "text": "INFORMATION_MODEL.WEAK"
            }
            ]
          }
        }],
        "disable": [{
          "conditions": [{
            "key": "H00",
            "op": "eq",
            "target": 0
          }]
        }, {
          "conditions": [{
            "key": "H29",
            "op": "gt",
            "target": 0
          }]
        }]
      }]
    },
    "AC_FAN_SPEED_FOR_BUSINESS": {
      "type": "button-group",
      "title": "INFORMATION_MODEL.FAN_SPEED",
      "models": [{
        "key": "H02",
        "values": [{
          "value": 0,
          "text": "INFORMATION_MODEL.AUTO"
        },
        {
          "value": 3,
          "text": "INFORMATION_MODEL.LOW"
        },
        {
          "value": 2,
          "text": "INFORMATION_MODEL.WEAK"
        },
        {
          "value": 7,
          "text": "INFORMATION_MODEL.SUPER_QUICK"
        },
        {
          "value": 1,
          "text": "INFORMATION_MODEL.SILENT"
        },
        {
          "value": 5,
          "text": "INFORMATION_MODEL.MED"
        },
        {
          "value": 6,
          "text": "INFORMATION_MODEL.QUICK"
        }
        ],
        "disable": [{
          "conditions": [{
            "key": "H00",
            "op": "eq",
            "target": 0
          }]
        }, {
          "conditions": [{
            "key": "H29",
            "op": "gt",
            "target": 0
          }]
        }]
      }]
    },
    "AC_TIMER": {
      "type": "range-with-toggle",
      "title": "INFORMATION_MODEL.TIMER",
      "models": [{
        "key": "H06",
        "values": {
          "min": 60,
          "max": 1440,
          "step": 60,
          "func": "timer"
        },
        "disable": [{
          "conditions": [{
            "key": "H00",
            "op": "eq",
            "target": 0
          }]
        }, {
          "conditions": [{
            "key": "H29",
            "op": "gt",
            "target": 0
          }]
        }]
      }, {
        "key": "H06",
        "values": [{
          "value": 0,
          "text": "INFORMATION_MODEL.OFF",
          "icon": "timer"
        }, {
          "value": "*",
          "text": ""
        }],
        "default": 60,
        "disable": [{
          "conditions": [{
            "key": "H00",
            "op": "eq",
            "target": 0
          }]
        }, {
          "conditions": [{
            "key": "H29",
            "op": "gt",
            "target": 0
          }]
        }]
      }]
    },
    "AC_HORIZONTAL_SWING": {
      "type": "range-with-toggle",
      "title": "INFORMATION_MODEL.HORIZONTAL_SWING",
      "models": [{
        "key": "H11",
        "values": [{
          "value": 5,
          "text": "INFORMATION_MODEL.LEFT",
          "icon": "fan-left"
        },
        {
          "value": 4,
          "text": "INFORMATION_MODEL.LEFT_CENTER",
          "icon": "fan-lc"
        },
        {
          "value": 3,
          "text": "INFORMATION_MODEL.CENTER",
          "icon": "fan-center"
        },
        {
          "value": 2,
          "text": "INFORMATION_MODEL.RIGHT_CENTER",
          "icon": "fan-rc"
        },
        {
          "value": 1,
          "text": "INFORMATION_MODEL.RIGHT",
          "icon": "fan-right"
        }
        ],
        "disable": [{
          "conditions": [{
            "key": "H00",
            "op": "eq",
            "target": 0
          }]
        }, {
          "conditions": [{
            "key": "H29",
            "op": "gt",
            "target": 0
          }]
        }]
      }, {
        "key": "H11",
        "values": [{
          "value": "*"
        },
        {
          "value": 0,
          "text": "INFORMATION_MODEL.AUTO",
          "icon": "fan-auto"
        }
        ],
        "default": 3,
        "disable": [{
          "conditions": [{
            "key": "H00",
            "op": "eq",
            "target": 0
          }]
        }, {
          "conditions": [{
            "key": "H29",
            "op": "gt",
            "target": 0
          }]
        }]
      }]
    },
    "AC_VERTICAL_SWING": {
      "type": "toggle",
      "title": "INFORMATION_MODEL.VERTICAL_SWING",
      "models": [{
        "key": "H0E",
        "values": [{
          "value": 0,
          "text": "INFORMATION_MODEL.OFF"
        },
        {
          "value": 1,
          "text": "INFORMATION_MODEL.ON"
        }
        ],
        "disable": [{
          "conditions": [{
            "key": "H00",
            "op": "eq",
            "target": 0
          }]
        }, {
          "conditions": [{
            "key": "H29",
            "op": "gt",
            "target": 0
          }]
        }]
      }]
    },
    "AC_MOISTURE": {
      "type": "button-group",
      "title": "INFORMATION_MODEL.MOISTURIZING",
      "models": [{
        "key": "H20",
        "values": [{
          "value": 0,
          "text": "INFORMATION_MODEL.OFF"
        },
        {
          "value": 1,
          "text": "INFORMATION_MODEL.LOW"
        },
        {
          "value": 2,
          "text": "INFORMATION_MODEL.HIGH"
        }
        ],
        "disable": [{
          "conditions": [{
            "key": "H00",
            "op": "eq",
            "target": 0
          }]
        }, {
          "conditions": [{
            "key": "H01",
            "op": "neq",
            "target": 0
          }]
        }, {
          "conditions": [{
            "key": "H29",
            "op": "gt",
            "target": 0
          }]
        }]
      }]
    },
    "AC_MOLD_DETECTION": {
      "type": "toggle",
      "title": "INFORMATION_MODEL.ANTI_MOLD",
      "models": [{
        "key": "H17",
        "values": [{
          "value": 0,
          "text": "INFORMATION_MODEL.OFF"
        },
        {
          "value": 1,
          "text": "INFORMATION_MODEL.ON"
        }
        ],
        "disable": [{
          "conditions": [{
            "key": "H00",
            "op": "eq",
            "target": 0
          }]
        }, {
          "conditions": [{
            "key": "H01",
            "op": "neq",
            "target": 0
          }]
        }, {
          "conditions": [{
            "key": "H29",
            "op": "gt",
            "target": 0
          }]
        }]
      }]
    },
    "AC_BRIGHTNESS": {
      "type": "range",
      "title": "INFORMATION_MODEL.BRIGHTNESS",
      "models": [{
        "key": "H1F",
        "values": [{
          "value": 3,
          "text": "INFORMATION_MODEL.OFF",
          "icon": "light-full"
        },
        {
          "value": 2,
          "text": "33%",
          "icon": "light"
        },
        {
          "value": 1,
          "text": "66%",
          "icon": "light"
        }, {
          "value": 0,
          "text": "100%",
          "icon": "light"
        }
        ],
        "disable": [{
          "conditions": [{
            "key": "H00",
            "op": "eq",
            "target": 0
          }]
        }, {
          "conditions": [{
            "key": "H29",
            "op": "gt",
            "target": 0
          }]
        }]
      }]
    },
    "AC_BEEP": {
      "type": "toggle",
      "title": "INFORMATION_MODEL.SOUND",
      "models": [{
        "key": "H1E",
        "values": [{
          "value": 1,
          "text": "INFORMATION_MODEL.OFF"
        }, {
          "value": 0,
          "text": "INFORMATION_MODEL.ON"
        }],
        "disable": [{
          "conditions": [{
            "key": "H00",
            "op": "eq",
            "target": 0
          }]
        }, {
          "conditions": [{
            "key": "H29",
            "op": "gt",
            "target": 0
          }]
        }]
      }]
    }
  },
  "errorFields": [
    {
      "key": "H29",
      "values": [
        {
          "value": 13,
          "text": "WATER TEMPERATURE TOO HIGH"
        },
        {
          "value": 85,
          "text": "ERROR IN VFD"
        }
      ]
    }
  ]
};

export const radModel = {
  "familyName": "Business",
  "familyMembers": [
    "RAD.*"
  ],
  "controlLayout": {
    "primary": [
      "AC_POWER_AND_TEMP"
    ],
    "secondary": [
      "AC_MODE",
      "AC_FAN_SPEED_FOR_BUSINESS",
      "AC_TIMER",
    ]
  },
  "scheduleLayout": {
    "primary": [
      "AC_TEMP",
      "AC_MODE",
      "AC_FAN_SPEED_FOR_BUSINESS",
    ]
  },
  "deviceId": 1,
  "components": {
    "AC_POWER_AND_TEMP": {
      "type": "large-toggle-with-range",
      "title": "",
      "models": [{
        "key": "H03",
        "values": {
          "min": 16,
          "max": 32,
          "step": 1,
          "func": "tempCelsius"
        },
        "disable": [{
          "conditions": [{
            "key": "H00",
            "op": "eq",
            "target": 0
          }]
        }, {
          "conditions": [{
            "key": "H01",
            "op": "gte",
            "target": 2
          }, {
            "key": "H01",
            "op": "lte",
            "target": 3
          }]
        }, {
          "conditions": [{
            "key": "H29",
            "op": "gt",
            "target": 0
          }]
        }]
      }, {
        "key": "H00",
        "values": [{
          "value": 0,
          "text": "INFORMATION_MODEL.OFF"
        },
        {
          "value": 1,
          "text": "INFORMATION_MODEL.ON"
        }
        ],
        "disable": [{
          "conditions": [{
            "key": "H29",
            "op": "gt",
            "target": 0
          }]
        }]
      }]
    },
    "AC_POWER": {
      "type": "toggle",
      "title": "INFORMATION_MODEL.POWER",
      "models": [{
        "key": "H00",
        "values": [{
          "value": 0,
          "text": "INFORMATION_MODEL.OFF"
        },
        {
          "value": 1,
          "text": "INFORMATION_MODEL.ON"
        }
        ],
        "disable": [{
          "conditions": [{
            "key": "H29",
            "op": "gt",
            "target": 0
          }]
        }]
      }]
    },
    "AC_TEMP": {
      "type": "range",
      "title": "INFORMATION_MODEL.TEMPERATURE",
      "models": [{
        "key": "H03",
        "values": {
          "min": 16,
          "max": 32,
          "step": 1,
          "func": "tempCelsius"
        },
        "disable": [{
          "conditions": [{
            "key": "H00",
            "op": "eq",
            "target": 0
          }]
        }, {
          "conditions": [{
            "key": "H01",
            "op": "gte",
            "target": 2
          }, {
            "key": "H01",
            "op": "lte",
            "target": 3
          }]
        }, {
          "conditions": [{
            "key": "H29",
            "op": "gt",
            "target": 0
          }]
        }]
      }]
    },
    "AC_TEMP_FOR_BUSINESS": {
      "type": "range",
      "title": "INFORMATION_MODEL.TEMPERATURE",
      "models": [{
        "key": "H03",
        "values": {
          "min": 19,
          "max": 30,
          "step": 1,
          "func": "tempCelsius"
        },
        "dependency": [{
          "conditions": [{
            "key": "H01",
            "op": "eq",
            "target": 4
          }],
          "result": {
            "values": {
              "min": 17,
              "max": 30,
              "step": 1,
              "func": "tempCelsius"
            }
          }
        }],
        "disable": [{
          "conditions": [{
            "key": "H00",
            "op": "eq",
            "target": 0
          }]
        }, {
          "conditions": [{
            "key": "H29",
            "op": "gt",
            "target": 0
          }]
        }]
      }]
    },
    "AC_MODE": {
      "type": "button-group",
      "title": "INFORMATION_MODEL.AC_MODE",
      "models": [{
        "key": "H01",
        "values": [{
          "value": 3,
          "text": "INFORMATION_MODEL.AUTO"
        }, {
          "value": 0,
          "text": "INFORMATION_MODEL.COOL"
        },
        {
          "value": 4,
          "text": "INFORMATION_MODEL.HEAT"
        },
        {
          "value": 2,
          "text": "INFORMATION_MODEL.FAN"
        },
        {
          "value": 1,
          "text": "INFORMATION_MODEL.DEHUMIDIFIER"
        }
        ],
        "disable": [{
          "conditions": [{
            "key": "H00",
            "op": "eq",
            "target": 0
          }]
        }, {
          "conditions": [{
            "key": "H29",
            "op": "gt",
            "target": 0
          }]
        }]
      }]
    },
    "AC_MODE_FOR_AC_ONLY": {
      "type": "button-group",
      "title": "INFORMATION_MODEL.AC_MODE",
      "models": [{
        "key": "H01",
        "values": [{
          "value": 3,
          "text": "INFORMATION_MODEL.AUTO"
        },
        {
          "value": 0,
          "text": "INFORMATION_MODEL.COOL"
        }
        ],
        "disable": [{
          "conditions": [{
            "key": "H00",
            "op": "eq",
            "target": 0
          }]
        }, {
          "conditions": [{
            "key": "H29",
            "op": "gt",
            "target": 0
          }]
        }]
      }]
    },
    "AC_FAN_SPEED_FOR_COMMERCIAL": {
      "type": "button-group",
      "title": "INFORMATION_MODEL.FAN_SPEED",
      "models": [{
        "key": "H02",
        "values": [{
          "value": 0,
          "text": "INFORMATION_MODEL.AUTO"
        },
        {
          "value": 1,
          "text": "INFORMATION_MODEL.SILENT"
        },
        {
          "value": 2,
          "text": "INFORMATION_MODEL.WEAK"
        },
        {
          "value": 3,
          "text": "INFORMATION_MODEL.LOW"
        },
        {
          "value": 4,
          "text": "INFORMATION_MODEL.HIGH"
        }
        ],
        "dependency": [{
          "conditions": [{
            "key": "H01",
            "op": "eq",
            "target": 1
          }],
          "result": {
            "values": [{
              "value": 1,
              "text": "INFORMATION_MODEL.SILENT"
            },
            {
              "value": 2,
              "text": "INFORMATION_MODEL.WEAK"
            }
            ]
          }
        }, {
          "conditions": [{
            "key": "H01",
            "op": "eq",
            "target": 2
          }],
          "result": {
            "values": [{
              "value": 1,
              "text": "INFORMATION_MODEL.SILENT"
            },
            {
              "value": 2,
              "text": "INFORMATION_MODEL.WEAK"
            },
            {
              "value": 3,
              "text": "INFORMATION_MODEL.LOW"
            },
            {
              "value": 4,
              "text": "INFORMATION_MODEL.HIGH"
            }
            ]
          }
        }, {
          "conditions": [{
            "key": "H01",
            "op": "eq",
            "target": 3
          }],
          "result": {
            "values": [{
              "value": 0,
              "text": "INFORMATION_MODEL.AUTO"
            },
            {
              "value": 1,
              "text": "INFORMATION_MODEL.SILENT"
            },
            {
              "value": 2,
              "text": "INFORMATION_MODEL.WEAK"
            }
            ]
          }
        }],
        "disable": [{
          "conditions": [{
            "key": "H00",
            "op": "eq",
            "target": 0
          }]
        }, {
          "conditions": [{
            "key": "H29",
            "op": "gt",
            "target": 0
          }]
        }]
      }]
    },
    "AC_FAN_SPEED_FOR_BUSINESS": {
      "type": "button-group",
      "title": "INFORMATION_MODEL.FAN_SPEED",
      "models": [{
        "key": "H02",
        "values": [{
          "value": 0,
          "text": "INFORMATION_MODEL.AUTO"
        },
        {
          "value": 3,
          "text": "INFORMATION_MODEL.LOW"
        },
        {
          "value": 2,
          "text": "INFORMATION_MODEL.WEAK"
        },
        {
          "value": 7,
          "text": "INFORMATION_MODEL.SUPER_QUICK"
        },
        {
          "value": 1,
          "text": "INFORMATION_MODEL.SILENT"
        },
        {
          "value": 5,
          "text": "INFORMATION_MODEL.MED"
        },
        {
          "value": 6,
          "text": "INFORMATION_MODEL.QUICK"
        }
        ],
        "disable": [{
          "conditions": [{
            "key": "H00",
            "op": "eq",
            "target": 0
          }]
        }, {
          "conditions": [{
            "key": "H29",
            "op": "gt",
            "target": 0
          }]
        }]
      }]
    },
    "AC_TIMER": {
      "type": "range-with-toggle",
      "title": "INFORMATION_MODEL.TIMER",
      "models": [{
        "key": "H06",
        "values": {
          "min": 60,
          "max": 1440,
          "step": 60,
          "func": "timer"
        },
        "disable": [{
          "conditions": [{
            "key": "H00",
            "op": "eq",
            "target": 0
          }]
        }, {
          "conditions": [{
            "key": "H29",
            "op": "gt",
            "target": 0
          }]
        }]
      }, {
        "key": "H06",
        "values": [{
          "value": 0,
          "text": "INFORMATION_MODEL.OFF",
          "icon": "timer"
        }, {
          "value": "*",
          "text": ""
        }],
        "default": 60,
        "disable": [{
          "conditions": [{
            "key": "H00",
            "op": "eq",
            "target": 0
          }]
        }, {
          "conditions": [{
            "key": "H29",
            "op": "gt",
            "target": 0
          }]
        }]
      }]
    },
    "AC_HORIZONTAL_SWING": {
      "type": "range-with-toggle",
      "title": "INFORMATION_MODEL.HORIZONTAL_SWING",
      "models": [{
        "key": "H11",
        "values": [{
          "value": 5,
          "text": "INFORMATION_MODEL.LEFT",
          "icon": "fan-left"
        },
        {
          "value": 4,
          "text": "INFORMATION_MODEL.LEFT_CENTER",
          "icon": "fan-lc"
        },
        {
          "value": 3,
          "text": "INFORMATION_MODEL.CENTER",
          "icon": "fan-center"
        },
        {
          "value": 2,
          "text": "INFORMATION_MODEL.RIGHT_CENTER",
          "icon": "fan-rc"
        },
        {
          "value": 1,
          "text": "INFORMATION_MODEL.RIGHT",
          "icon": "fan-right"
        }
        ],
        "disable": [{
          "conditions": [{
            "key": "H00",
            "op": "eq",
            "target": 0
          }]
        }, {
          "conditions": [{
            "key": "H29",
            "op": "gt",
            "target": 0
          }]
        }]
      }, {
        "key": "H11",
        "values": [{
          "value": "*"
        },
        {
          "value": 0,
          "text": "INFORMATION_MODEL.AUTO",
          "icon": "fan-auto"
        }
        ],
        "default": 3,
        "disable": [{
          "conditions": [{
            "key": "H00",
            "op": "eq",
            "target": 0
          }]
        }, {
          "conditions": [{
            "key": "H29",
            "op": "gt",
            "target": 0
          }]
        }]
      }]
    },
    "AC_VERTICAL_SWING": {
      "type": "toggle",
      "title": "INFORMATION_MODEL.VERTICAL_SWING",
      "models": [{
        "key": "H0E",
        "values": [{
          "value": 0,
          "text": "INFORMATION_MODEL.OFF"
        },
        {
          "value": 1,
          "text": "INFORMATION_MODEL.ON"
        }
        ],
        "disable": [{
          "conditions": [{
            "key": "H00",
            "op": "eq",
            "target": 0
          }]
        }, {
          "conditions": [{
            "key": "H29",
            "op": "gt",
            "target": 0
          }]
        }]
      }]
    },
    "AC_MOISTURE": {
      "type": "button-group",
      "title": "INFORMATION_MODEL.MOISTURIZING",
      "models": [{
        "key": "H20",
        "values": [{
          "value": 0,
          "text": "INFORMATION_MODEL.OFF"
        },
        {
          "value": 1,
          "text": "INFORMATION_MODEL.LOW"
        },
        {
          "value": 2,
          "text": "INFORMATION_MODEL.HIGH"
        }
        ],
        "disable": [{
          "conditions": [{
            "key": "H00",
            "op": "eq",
            "target": 0
          }]
        }, {
          "conditions": [{
            "key": "H01",
            "op": "neq",
            "target": 0
          }]
        }, {
          "conditions": [{
            "key": "H29",
            "op": "gt",
            "target": 0
          }]
        }]
      }]
    },
    "AC_MOLD_DETECTION": {
      "type": "toggle",
      "title": "INFORMATION_MODEL.ANTI_MOLD",
      "models": [{
        "key": "H17",
        "values": [{
          "value": 0,
          "text": "INFORMATION_MODEL.OFF"
        },
        {
          "value": 1,
          "text": "INFORMATION_MODEL.ON"
        }
        ],
        "disable": [{
          "conditions": [{
            "key": "H00",
            "op": "eq",
            "target": 0
          }]
        }, {
          "conditions": [{
            "key": "H01",
            "op": "neq",
            "target": 0
          }]
        }, {
          "conditions": [{
            "key": "H29",
            "op": "gt",
            "target": 0
          }]
        }]
      }]
    },
    "AC_BRIGHTNESS": {
      "type": "range",
      "title": "INFORMATION_MODEL.BRIGHTNESS",
      "models": [{
        "key": "H1F",
        "values": [{
          "value": 3,
          "text": "INFORMATION_MODEL.OFF",
          "icon": "light-full"
        },
        {
          "value": 2,
          "text": "33%",
          "icon": "light"
        },
        {
          "value": 1,
          "text": "66%",
          "icon": "light"
        }, {
          "value": 0,
          "text": "100%",
          "icon": "light"
        }
        ],
        "disable": [{
          "conditions": [{
            "key": "H00",
            "op": "eq",
            "target": 0
          }]
        }, {
          "conditions": [{
            "key": "H29",
            "op": "gt",
            "target": 0
          }]
        }]
      }]
    },
    "AC_BEEP": {
      "type": "toggle",
      "title": "INFORMATION_MODEL.SOUND",
      "models": [{
        "key": "H1E",
        "values": [{
          "value": 1,
          "text": "INFORMATION_MODEL.OFF"
        }, {
          "value": 0,
          "text": "INFORMATION_MODEL.ON"
        }],
        "disable": [{
          "conditions": [{
            "key": "H00",
            "op": "eq",
            "target": 0
          }]
        }, {
          "conditions": [{
            "key": "H29",
            "op": "gt",
            "target": 0
          }]
        }]
      }]
    }
  },
  "errorFields": [
    {
      "key": "H29",
      "values": [
        {
          "value": 13,
          "text": "WATER TEMPERATURE TOO HIGH"
        },
        {
          "value": 85,
          "text": "ERROR IN VFD"
        }
      ]
    }
  ]
};

export const emptyLayoutModel = {
  "familyName": "Empty",
  "familyMembers": [
    "empty.*"
  ],
  "controlLayout": {
  },
  "scheduleLayout": {
  },
  "deviceId": 1,
  "components": {
    "AC_POWER_AND_TEMP": {
      "type": "large-toggle-with-range",
      "title": "",
      "models": [{
        "key": "H03",
        "values": {
          "min": 16,
          "max": 32,
          "step": 1,
          "func": "tempCelsius"
        },
        "disable": [{
          "conditions": [{
            "key": "H00",
            "op": "eq",
            "target": 0
          }]
        }, {
          "conditions": [{
            "key": "H01",
            "op": "gte",
            "target": 2
          }, {
            "key": "H01",
            "op": "lte",
            "target": 3
          }]
        }, {
          "conditions": [{
            "key": "H29",
            "op": "gt",
            "target": 0
          }]
        }]
      }, {
        "key": "H00",
        "values": [{
          "value": 0,
          "text": "INFORMATION_MODEL.OFF"
        },
        {
          "value": 1,
          "text": "INFORMATION_MODEL.ON"
        }
        ],
        "disable": [{
          "conditions": [{
            "key": "H29",
            "op": "gt",
            "target": 0
          }]
        }]
      }]
    },
    "AC_POWER": {
      "type": "toggle",
      "title": "INFORMATION_MODEL.POWER",
      "models": [{
        "key": "H00",
        "values": [{
          "value": 0,
          "text": "INFORMATION_MODEL.OFF"
        },
        {
          "value": 1,
          "text": "INFORMATION_MODEL.ON"
        }
        ],
        "disable": [{
          "conditions": [{
            "key": "H29",
            "op": "gt",
            "target": 0
          }]
        }]
      }]
    },
    "AC_TEMP": {
      "type": "range",
      "title": "INFORMATION_MODEL.TEMPERATURE",
      "models": [{
        "key": "H03",
        "values": {
          "min": 16,
          "max": 32,
          "step": 1,
          "func": "tempCelsius"
        },
        "disable": [{
          "conditions": [{
            "key": "H00",
            "op": "eq",
            "target": 0
          }]
        }, {
          "conditions": [{
            "key": "H01",
            "op": "gte",
            "target": 2
          }, {
            "key": "H01",
            "op": "lte",
            "target": 3
          }]
        }, {
          "conditions": [{
            "key": "H29",
            "op": "gt",
            "target": 0
          }]
        }]
      }]
    },
    "AC_TEMP_FOR_BUSINESS": {
      "type": "range",
      "title": "INFORMATION_MODEL.TEMPERATURE",
      "models": [{
        "key": "H03",
        "values": {
          "min": 19,
          "max": 30,
          "step": 1,
          "func": "tempCelsius"
        },
        "dependency": [{
          "conditions": [{
            "key": "H01",
            "op": "eq",
            "target": 4
          }],
          "result": {
            "values": {
              "min": 17,
              "max": 30,
              "step": 1,
              "func": "tempCelsius"
            }
          }
        }],
        "disable": [{
          "conditions": [{
            "key": "H00",
            "op": "eq",
            "target": 0
          }]
        }, {
          "conditions": [{
            "key": "H29",
            "op": "gt",
            "target": 0
          }]
        }]
      }]
    },
    "AC_MODE": {
      "type": "button-group",
      "title": "INFORMATION_MODEL.AC_MODE",
      "models": [{
        "key": "H01",
        "values": [{
          "value": 3,
          "text": "INFORMATION_MODEL.AUTO"
        }, {
          "value": 0,
          "text": "INFORMATION_MODEL.COOL"
        },
        {
          "value": 4,
          "text": "INFORMATION_MODEL.HEAT"
        },
        {
          "value": 2,
          "text": "INFORMATION_MODEL.FAN"
        },
        {
          "value": 1,
          "text": "INFORMATION_MODEL.DEHUMIDIFIER"
        }
        ],
        "disable": [{
          "conditions": [{
            "key": "H00",
            "op": "eq",
            "target": 0
          }]
        }, {
          "conditions": [{
            "key": "H29",
            "op": "gt",
            "target": 0
          }]
        }]
      }]
    },
    "AC_MODE_FOR_AC_ONLY": {
      "type": "button-group",
      "title": "INFORMATION_MODEL.AC_MODE",
      "models": [{
        "key": "H01",
        "values": [{
          "value": 3,
          "text": "INFORMATION_MODEL.AUTO"
        },
        {
          "value": 0,
          "text": "INFORMATION_MODEL.COOL"
        }
        ],
        "disable": [{
          "conditions": [{
            "key": "H00",
            "op": "eq",
            "target": 0
          }]
        }, {
          "conditions": [{
            "key": "H29",
            "op": "gt",
            "target": 0
          }]
        }]
      }]
    },
    "AC_FAN_SPEED_FOR_COMMERCIAL": {
      "type": "button-group",
      "title": "INFORMATION_MODEL.FAN_SPEED",
      "models": [{
        "key": "H02",
        "values": [{
          "value": 0,
          "text": "INFORMATION_MODEL.AUTO"
        },
        {
          "value": 1,
          "text": "INFORMATION_MODEL.SILENT"
        },
        {
          "value": 2,
          "text": "INFORMATION_MODEL.WEAK"
        },
        {
          "value": 3,
          "text": "INFORMATION_MODEL.LOW"
        },
        {
          "value": 4,
          "text": "INFORMATION_MODEL.HIGH"
        }
        ],
        "dependency": [{
          "conditions": [{
            "key": "H01",
            "op": "eq",
            "target": 1
          }],
          "result": {
            "values": [{
              "value": 1,
              "text": "INFORMATION_MODEL.SILENT"
            },
            {
              "value": 2,
              "text": "INFORMATION_MODEL.WEAK"
            }
            ]
          }
        }, {
          "conditions": [{
            "key": "H01",
            "op": "eq",
            "target": 2
          }],
          "result": {
            "values": [{
              "value": 1,
              "text": "INFORMATION_MODEL.SILENT"
            },
            {
              "value": 2,
              "text": "INFORMATION_MODEL.WEAK"
            },
            {
              "value": 3,
              "text": "INFORMATION_MODEL.LOW"
            },
            {
              "value": 4,
              "text": "INFORMATION_MODEL.HIGH"
            }
            ]
          }
        }, {
          "conditions": [{
            "key": "H01",
            "op": "eq",
            "target": 3
          }],
          "result": {
            "values": [{
              "value": 0,
              "text": "INFORMATION_MODEL.AUTO"
            },
            {
              "value": 1,
              "text": "INFORMATION_MODEL.SILENT"
            },
            {
              "value": 2,
              "text": "INFORMATION_MODEL.WEAK"
            }
            ]
          }
        }],
        "disable": [{
          "conditions": [{
            "key": "H00",
            "op": "eq",
            "target": 0
          }]
        }, {
          "conditions": [{
            "key": "H29",
            "op": "gt",
            "target": 0
          }]
        }]
      }]
    },
    "AC_FAN_SPEED_FOR_BUSINESS": {
      "type": "button-group",
      "title": "INFORMATION_MODEL.FAN_SPEED",
      "models": [{
        "key": "H02",
        "values": [{
          "value": 0,
          "text": "INFORMATION_MODEL.AUTO"
        },
        {
          "value": 3,
          "text": "INFORMATION_MODEL.LOW"
        },
        {
          "value": 2,
          "text": "INFORMATION_MODEL.WEAK"
        },
        {
          "value": 7,
          "text": "INFORMATION_MODEL.SUPER_QUICK"
        },
        {
          "value": 1,
          "text": "INFORMATION_MODEL.SILENT"
        },
        {
          "value": 5,
          "text": "INFORMATION_MODEL.MED"
        },
        {
          "value": 6,
          "text": "INFORMATION_MODEL.QUICK"
        }
        ],
        "disable": [{
          "conditions": [{
            "key": "H00",
            "op": "eq",
            "target": 0
          }]
        }, {
          "conditions": [{
            "key": "H29",
            "op": "gt",
            "target": 0
          }]
        }]
      }]
    },
    "AC_TIMER": {
      "type": "range-with-toggle",
      "title": "INFORMATION_MODEL.TIMER",
      "models": [{
        "key": "H06",
        "values": {
          "min": 60,
          "max": 1440,
          "step": 60,
          "func": "timer"
        },
        "disable": [{
          "conditions": [{
            "key": "H00",
            "op": "eq",
            "target": 0
          }]
        }, {
          "conditions": [{
            "key": "H29",
            "op": "gt",
            "target": 0
          }]
        }]
      }, {
        "key": "H06",
        "values": [{
          "value": 0,
          "text": "INFORMATION_MODEL.OFF",
          "icon": "timer"
        }, {
          "value": "*",
          "text": ""
        }],
        "default": 60,
        "disable": [{
          "conditions": [{
            "key": "H00",
            "op": "eq",
            "target": 0
          }]
        }, {
          "conditions": [{
            "key": "H29",
            "op": "gt",
            "target": 0
          }]
        }]
      }]
    },
    "AC_HORIZONTAL_SWING": {
      "type": "range-with-toggle",
      "title": "INFORMATION_MODEL.HORIZONTAL_SWING",
      "models": [{
        "key": "H11",
        "values": [{
          "value": 5,
          "text": "INFORMATION_MODEL.LEFT",
          "icon": "fan-left"
        },
        {
          "value": 4,
          "text": "INFORMATION_MODEL.LEFT_CENTER",
          "icon": "fan-lc"
        },
        {
          "value": 3,
          "text": "INFORMATION_MODEL.CENTER",
          "icon": "fan-center"
        },
        {
          "value": 2,
          "text": "INFORMATION_MODEL.RIGHT_CENTER",
          "icon": "fan-rc"
        },
        {
          "value": 1,
          "text": "INFORMATION_MODEL.RIGHT",
          "icon": "fan-right"
        }
        ],
        "disable": [{
          "conditions": [{
            "key": "H00",
            "op": "eq",
            "target": 0
          }]
        }, {
          "conditions": [{
            "key": "H29",
            "op": "gt",
            "target": 0
          }]
        }]
      }, {
        "key": "H11",
        "values": [{
          "value": "*"
        },
        {
          "value": 0,
          "text": "INFORMATION_MODEL.AUTO",
          "icon": "fan-auto"
        }
        ],
        "default": 3,
        "disable": [{
          "conditions": [{
            "key": "H00",
            "op": "eq",
            "target": 0
          }]
        }, {
          "conditions": [{
            "key": "H29",
            "op": "gt",
            "target": 0
          }]
        }]
      }]
    },
    "AC_VERTICAL_SWING": {
      "type": "toggle",
      "title": "INFORMATION_MODEL.VERTICAL_SWING",
      "models": [{
        "key": "H0E",
        "values": [{
          "value": 0,
          "text": "INFORMATION_MODEL.OFF"
        },
        {
          "value": 1,
          "text": "INFORMATION_MODEL.ON"
        }
        ],
        "disable": [{
          "conditions": [{
            "key": "H00",
            "op": "eq",
            "target": 0
          }]
        }, {
          "conditions": [{
            "key": "H29",
            "op": "gt",
            "target": 0
          }]
        }]
      }]
    },
    "AC_MOISTURE": {
      "type": "button-group",
      "title": "INFORMATION_MODEL.MOISTURIZING",
      "models": [{
        "key": "H20",
        "values": [{
          "value": 0,
          "text": "INFORMATION_MODEL.OFF"
        },
        {
          "value": 1,
          "text": "INFORMATION_MODEL.LOW"
        },
        {
          "value": 2,
          "text": "INFORMATION_MODEL.HIGH"
        }
        ],
        "disable": [{
          "conditions": [{
            "key": "H00",
            "op": "eq",
            "target": 0
          }]
        }, {
          "conditions": [{
            "key": "H01",
            "op": "neq",
            "target": 0
          }]
        }, {
          "conditions": [{
            "key": "H29",
            "op": "gt",
            "target": 0
          }]
        }]
      }]
    },
    "AC_MOLD_DETECTION": {
      "type": "toggle",
      "title": "INFORMATION_MODEL.ANTI_MOLD",
      "models": [{
        "key": "H17",
        "values": [{
          "value": 0,
          "text": "INFORMATION_MODEL.OFF"
        },
        {
          "value": 1,
          "text": "INFORMATION_MODEL.ON"
        }
        ],
        "disable": [{
          "conditions": [{
            "key": "H00",
            "op": "eq",
            "target": 0
          }]
        }, {
          "conditions": [{
            "key": "H01",
            "op": "neq",
            "target": 0
          }]
        }, {
          "conditions": [{
            "key": "H29",
            "op": "gt",
            "target": 0
          }]
        }]
      }]
    },
    "AC_BRIGHTNESS": {
      "type": "range",
      "title": "INFORMATION_MODEL.BRIGHTNESS",
      "models": [{
        "key": "H1F",
        "values": [{
          "value": 3,
          "text": "INFORMATION_MODEL.OFF",
          "icon": "light-full"
        },
        {
          "value": 2,
          "text": "33%",
          "icon": "light"
        },
        {
          "value": 1,
          "text": "66%",
          "icon": "light"
        }, {
          "value": 0,
          "text": "100%",
          "icon": "light"
        }
        ],
        "disable": [{
          "conditions": [{
            "key": "H00",
            "op": "eq",
            "target": 0
          }]
        }, {
          "conditions": [{
            "key": "H29",
            "op": "gt",
            "target": 0
          }]
        }]
      }]
    },
    "AC_BEEP": {
      "type": "toggle",
      "title": "INFORMATION_MODEL.SOUND",
      "models": [{
        "key": "H1E",
        "values": [{
          "value": 1,
          "text": "INFORMATION_MODEL.OFF"
        }, {
          "value": 0,
          "text": "INFORMATION_MODEL.ON"
        }],
        "disable": [{
          "conditions": [{
            "key": "H00",
            "op": "eq",
            "target": 0
          }]
        }, {
          "conditions": [{
            "key": "H29",
            "op": "gt",
            "target": 0
          }]
        }]
      }]
    }
  },
};

export const noComponentModel = {
  "familyName": "Nothing",
  "familyMembers": [
    "nothing.*"
  ],
  "deviceId": 1,
  "components": {
  },
};
