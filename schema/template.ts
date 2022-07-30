import { FromSchema } from 'json-schema-to-ts';

const t = {};

export type self = FromSchema<
  typeof t,
  {
    deserialize: [
      {
        pattern: {
          type: 'string';
          format: 'date';
        };
        output: Date;
      },
    ];
  }
>;
