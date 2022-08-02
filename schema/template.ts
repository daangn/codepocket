import Ajv, { JSONSchemaType } from 'ajv';
import { FromSchema } from 'json-schema-to-ts';

const ajv = new Ajv({ formats: { date: true, time: true } });

// schema로 바뀝니다
const t = {};

// api이름으로 바뀝니다
export type Self = FromSchema<
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

// validate이름으로 바뀝니다
export const selfValidate = ajv.compile(t as unknown as JSONSchemaType<Self>);
