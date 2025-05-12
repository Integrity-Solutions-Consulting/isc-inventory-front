/* eslint-disable */
// This document was generated automatically by openapi-box

/**
 * @typedef {import('@sinclair/typebox').TSchema} TSchema
 */

/**
 * @template {TSchema} T
 * @typedef {import('@sinclair/typebox').Static<T>} Static
 */

/**
 * @typedef {import('@sinclair/typebox').SchemaOptions} SchemaOptions
 */

/**
 * @typedef {{
 *  [Path in keyof typeof schema]: {
 *    [Method in keyof typeof schema[Path]]: {
 *      [Prop in keyof typeof schema[Path][Method]]: typeof schema[Path][Method][Prop] extends TSchema ?
 *        Static<typeof schema[Path][Method][Prop]> :
 *        undefined
 *    }
 *  }
 * }} SchemaType
 */

/**
 * @typedef {{
 *  [ComponentType in keyof typeof _components]: {
 *    [ComponentName in keyof typeof _components[ComponentType]]: typeof _components[ComponentType][ComponentName] extends TSchema ?
 *      Static<typeof _components[ComponentType][ComponentName]> :
 *      undefined
 *  }
 * }} ComponentType
 */

import { Type as T, TypeRegistry, Kind, CloneType } from '@sinclair/typebox';
import { Value } from '@sinclair/typebox/value';

/**
 * @typedef {{
 *  [Kind]: 'Binary'
 *  static: string | File | Blob | Uint8Array
 *  anyOf: [{
 *    type: 'object',
 *    additionalProperties: true
 *  }, {
 *    type: 'string',
 *    format: 'binary'
 *  }]
 * } & TSchema} TBinary
 */

/**
 * @returns {TBinary}
 */
const Binary = () => {
  /**
   * @param {TBinary} schema
   * @param {unknown} value
   * @returns {boolean}
   */
  function BinaryCheck(schema, value) {
    const type = Object.prototype.toString.call(value);
    return (
      type === '[object Blob]' ||
      type === '[object File]' ||
      type === '[object String]' ||
      type === '[object Uint8Array]'
    );
  }

  if (!TypeRegistry.Has('Binary')) TypeRegistry.Set('Binary', BinaryCheck);

  return /** @type {TBinary} */ {
    anyOf: [
      {
        type: 'object',
        additionalProperties: true,
      },
      {
        type: 'string',
        format: 'binary',
      },
    ],
    [Kind]: 'Binary',
  };
};

const DefinitionsModelsDriverAddress = T.Object({
  latitude: T.Optional(T.Number()),
  longitude: T.Optional(T.Number()),
  zone_id: T.Optional(T.String()),
  zone_name: T.Optional(T.String()),
});
const DefinitionsModelsDriverAppMetadata = T.Object({
  average_rating: T.Optional(T.Number()),
  ban_reason: T.Optional(T.String()),
  cloud_messaging_tokens: T.Optional(T.Array(T.String())),
  online: T.Optional(T.String()),
  rating: T.Optional(T.Number()),
});
const DefinitionsModelsDriverDetails = T.Object({
  approval_date: T.Optional(T.Number()),
  id_back_photo: T.Optional(T.String()),
  ine_photo: T.Optional(T.String()),
  photo_insurance: T.Optional(T.String()),
  plates: T.Optional(T.String()),
  profile_pic: T.Optional(T.String()),
  retailer_id: T.Optional(T.String()),
  vehicle: T.Optional(T.String()),
  vehicle_photo: T.Optional(T.String()),
});
const DefinitionsModelsDriverPaymentInfo = T.Object({
  ach_account_number: T.Optional(T.String()),
  ach_routing: T.Optional(T.String()),
  cash_tag: T.Optional(T.String()),
  payout_mode: T.Optional(T.String()),
  zelle_email: T.Optional(T.String()),
  zelle_phone: T.Optional(T.String()),
});
const DefinitionsModelsDriver = T.Object({
  address: T.Optional(CloneType(DefinitionsModelsDriverAddress)),
  app_metadata: T.Optional(CloneType(DefinitionsModelsDriverAppMetadata)),
  balance: T.Optional(T.Number()),
  birth_date: T.Optional(T.String()),
  current_order: T.Optional(T.String()),
  details: T.Optional(CloneType(DefinitionsModelsDriverDetails)),
  email: T.Optional(T.String()),
  first_name: T.Optional(T.String()),
  id: T.Optional(T.String()),
  last_name: T.Optional(T.String()),
  name: T.Optional(T.String()),
  order_count: T.Optional(T.Number()),
  payment_info: T.Optional(CloneType(DefinitionsModelsDriverPaymentInfo)),
  phone: T.Optional(T.String()),
  phone_without_lada: T.Optional(T.String()),
  photo_url: T.Optional(T.String()),
  secondary_phone: T.Optional(T.String()),
  status: T.Optional(T.String()),
});
const DefinitionsModelsDriverPagination = T.Object({
  currentPage: T.Optional(T.Integer()),
  data: T.Optional(T.Array(CloneType(DefinitionsModelsDriver))),
  next: T.Optional(T.Integer()),
  pagination: T.Optional(T.Array(T.Integer())),
  paginationCount: T.Optional(T.Integer()),
  paginationSize: T.Optional(T.Integer()),
  prev: T.Optional(T.Integer()),
});
const DefinitionsUtilsError = T.Object({
  code: T.Optional(T.Integer()),
  description: T.Optional(T.String()),
});
const DefinitionsModelsDriverStatus = T.Object({
  'Repartidor id': T.Optional(T.String()),
  status: T.Optional(T.String()),
});
const DefinitionsModelsCredits = T.Object({
  credits: T.Optional(T.Integer()),
  value: T.Optional(T.Number()),
});
const DefinitionsModelsReferralReward = T.Object({
  user_id: T.Optional(T.String()),
  value: T.Optional(T.String()),
});
const DefinitionsModelsRewardsApplied = T.Object({
  icon: T.Optional(T.String()),
  id: T.Optional(T.String()),
  profit: T.Optional(T.String()),
  type: T.Optional(T.String()),
  value: T.Optional(T.String()),
});
const DefinitionsModelsFirebaseOrder = T.Object({
  'Aceptar tarjeta': T.Optional(T.String()),
  'Balance repartidor': T.Optional(T.Number()),
  'Balance restaurante': T.Optional(T.Number()),
  'Bobtail Truck': T.Optional(T.Number()),
  Brand: T.Optional(T.String()),
  'Cliente First Name': T.Optional(T.String()),
  'Cliente Last Name': T.Optional(T.String()),
  'Cliente id': T.Optional(T.String()),
  'Cliente name': T.Optional(T.String()),
  'Cliente telefono': T.Optional(T.String()),
  'Cliente telefono no lada': T.Optional(T.String()),
  'Comision amigo': T.Optional(T.Number()),
  'Comision envio': T.Optional(T.Number()),
  'Confirm PaymentIntent': T.Optional(T.String()),
  Descripcion: T.Optional(T.String()),
  Direccion: T.Optional(T.String()),
  'Direccion negocio': T.Optional(T.String()),
  'Direccion vinculada': T.Optional(T.String()),
  Distancia: T.Optional(T.String()),
  'Driver status': T.Optional(T.String()),
  ETA: T.Optional(T.Integer()),
  'Email cliente': T.Optional(T.String()),
  'Email retailer': T.Optional(T.String()),
  Envio: T.Optional(T.Number()),
  'Esquema de pago': T.Optional(T.String()),
  'Exchange Tank': T.Optional(T.String()),
  'Foto repartidor': T.Optional(T.String()),
  'Foto usuario': T.Optional(T.String()),
  'Fotos delivered tanks': T.Optional(T.String()),
  'Fotos exchange tanks': T.Optional(T.String()),
  'Franquicia email': T.Optional(T.String()),
  'Franquicia telefono': T.Optional(T.String()),
  'Franquicia vinculada': T.Optional(T.String()),
  'Historial reparti': T.Optional(T.Number()),
  'ID vinculada': T.Optional(T.String()),
  'Logo amigo': T.Optional(T.String()),
  'Negocio id': T.Optional(T.String()),
  'No Orden': T.Optional(T.String()),
  'Nombre amigo': T.Optional(T.String()),
  'Orden id': T.Optional(T.String()),
  Pago: T.Optional(T.String()),
  'Pago default': T.Optional(T.String()),
  'Pago restaurante': T.Optional(T.Number()),
  'Payment intent': T.Optional(T.String()),
  'Portable Tank': T.Optional(T.String()),
  Productos: T.Any(),
  'Promedio reparti': T.Optional(T.String()),
  Propina: T.Optional(T.Number()),
  Referencia: T.Optional(T.String()),
  'Refill Tank': T.Optional(T.String()),
  'Repartidor calificacion': T.Optional(T.Number()),
  'Repartidor comentarios': T.Optional(T.String()),
  'Repartidor id': T.Optional(T.String()),
  'Repartidor name': T.Optional(T.String()),
  'Repartidor telefono': T.Optional(T.String()),
  'Repartidores notificados': T.Optional(
    T.Object(
      {},
      {
        additionalProperties: CloneType(DefinitionsModelsDriverStatus),
      },
    ),
  ),
  Servicio: T.Optional(T.Number()),
  'Sistema Operativo': T.Optional(T.String()),
  Status: T.Optional(T.String()),
  'Sub comision amigo': T.Optional(T.Number()),
  'Sub comision envio': T.Optional(T.Number()),
  Subtotal: T.Optional(T.Number()),
  'Subtotal amigos con %': T.Optional(T.Number()),
  'Subtotal envio con %': T.Optional(T.Number()),
  'Telefono negocio': T.Optional(T.String()),
  'Time aceptado': T.Optional(T.Integer()),
  'Time entregando': T.Optional(T.Integer()),
  'Time orden lista': T.Optional(T.Integer()),
  'Time pedido': T.Optional(T.Integer()),
  'Time preparando': T.Optional(T.Integer()),
  Total: T.Optional(T.Number()),
  'Total comision exxpres': T.Optional(T.Number()),
  'Zona vinculada': T.Optional(T.String()),
  cashback_percent: T.Optional(T.Number()),
  city: T.Optional(T.String()),
  credit_multiplier: T.Optional(T.Number()),
  credits: T.Optional(T.Number()),
  credits_apply: T.Optional(T.Intersect([CloneType(DefinitionsModelsCredits)])),
  currency_code: T.Optional(T.String()),
  form_id: T.Optional(T.String()),
  latitude: T.Optional(T.Number()),
  'latitude negocio': T.Optional(T.Number()),
  'latitude original': T.Optional(T.Number()),
  'latitude vinculada': T.Optional(T.Number()),
  level: T.Optional(T.Number()),
  longitude: T.Optional(T.Number()),
  'longitude negocio': T.Optional(T.Number()),
  'longitude original': T.Optional(T.Number()),
  'longitude vinculada': T.Optional(T.Number()),
  price_per_gallon: T.Optional(T.Number()),
  products_label: T.Optional(T.String()),
  products_label_retailer: T.Optional(T.String()),
  recurring_order: T.Optional(T.String()),
  referral_reward: T.Optional(CloneType(DefinitionsModelsReferralReward)),
  rewards_applied: T.Optional(CloneType(DefinitionsModelsRewardsApplied)),
  short_address: T.Optional(T.String()),
  tank_photo: T.Optional(T.String()),
  total_with_discounts: T.Optional(T.Number()),
  type_service: T.Optional(T.String()),
  type_service_text: T.Optional(T.String()),
});
const DefinitionsModelsOrderPagination = T.Object({
  currentPage: T.Optional(T.Integer()),
  data: T.Optional(T.Array(CloneType(DefinitionsModelsFirebaseOrder))),
  next: T.Optional(T.Integer()),
  pagination: T.Optional(T.Array(T.Integer())),
  paginationCount: T.Optional(T.Integer()),
  paginationSize: T.Optional(T.Integer()),
  prev: T.Optional(T.Integer()),
});
const DefinitionsModelsUserAddress = T.Object({
  address: T.Optional(T.String()),
  address_id: T.Optional(T.String()),
  city: T.Optional(T.String()),
  lat: T.Optional(T.Number()),
  lon: T.Optional(T.Number()),
  place_tag: T.Optional(T.String()),
  reference: T.Optional(T.String()),
  short_address: T.Optional(T.String()),
  zone_id: T.Optional(T.String()),
  zone_name: T.Optional(T.String()),
});
const DefinitionsModelsFirebaseMemberReferralData = T.Object({
  code: T.Optional(T.String()),
  timestamp: T.Optional(T.Number()),
  user_id: T.Optional(T.String()),
});
const DefinitionsModelsTankPhoto = T.Object({
  src: T.Optional(T.String()),
});
const DefinitionsModelsUserMetadata = T.Object({
  ban_description: T.Optional(T.String()),
  description: T.Optional(T.String()),
  favorite_retailers: T.Any(),
  first_login_reward: T.Optional(T.String()),
  has_referred: T.Optional(T.String()),
  index_timestamp: T.Optional(T.String()),
  level: T.Optional(T.Number()),
  os: T.Optional(T.String()),
  ownership_tank: T.Optional(T.String()),
  progress: T.Optional(T.Number()),
  provider: T.Optional(T.String()),
  rating: T.Optional(T.String()),
  referral_data: T.Optional(
    T.Intersect([CloneType(DefinitionsModelsFirebaseMemberReferralData)]),
  ),
  referred_id: T.Optional(T.String()),
  tags: T.Optional(T.Array(T.String())),
  tank_photo: T.Optional(T.String()),
  tank_photos: T.Optional(
    T.Object(
      {},
      {
        additionalProperties: CloneType(DefinitionsModelsTankPhoto),
      },
    ),
  ),
  timestamp: T.Optional(T.Number()),
});
const DefinitionsModelsUserPaymentInfo = T.Object({
  card_brand: T.Optional(T.String()),
  card_cvv: T.Optional(T.String()),
  cash: T.Optional(T.Number()),
  credits: T.Optional(T.Number()),
  credits_auto_apply: T.Optional(T.String()),
  default_payment_method: T.Optional(T.String()),
  payarc_id: T.Optional(T.String()),
});
const DefinitionsModelsUser = T.Object({
  address: T.Optional(CloneType(DefinitionsModelsUserAddress)),
  birthday: T.Optional(T.String()),
  cloud_messaging_tokens: T.Optional(T.Array(T.String())),
  created_at: T.Optional(T.Number()),
  email: T.Optional(T.String()),
  first_name: T.Optional(T.String()),
  id: T.Optional(T.String()),
  last_name: T.Optional(T.String()),
  metadata: T.Optional(CloneType(DefinitionsModelsUserMetadata)),
  name: T.Optional(T.String()),
  payment_info: T.Optional(CloneType(DefinitionsModelsUserPaymentInfo)),
  phone: T.Optional(T.String()),
  phone_without_lada: T.Optional(T.String()),
  photo_url: T.Optional(T.String()),
  status: T.Optional(T.String()),
});
const DefinitionsModelsUserPagination = T.Object({
  currentPage: T.Optional(T.Integer()),
  data: T.Optional(T.Array(CloneType(DefinitionsModelsUser))),
  next: T.Optional(T.Integer()),
  pagination: T.Optional(T.Array(T.Integer())),
  paginationCount: T.Optional(T.Integer()),
  paginationSize: T.Optional(T.Integer()),
  prev: T.Optional(T.Integer()),
});

const schema = {
  '/drivers': {
    GET: {
      args: T.Optional(
        T.Object({
          query: T.Optional(
            T.Object({
              page: T.Optional(T.Integer({ 'x-in': 'query' })),
              pageSize: T.Optional(T.Integer({ 'x-in': 'query' })),
              relations: T.Optional(T.String({ 'x-in': 'query' })),
            }),
          ),
        }),
      ),
      data: CloneType(DefinitionsModelsDriverPagination, {
        'x-status-code': '200',
      }),
      error: T.Union([
        CloneType(DefinitionsUtilsError, { 'x-status-code': '503' }),
      ]),
    },
    POST: {
      args: T.Void(),
      data: CloneType(DefinitionsModelsDriver, { 'x-status-code': '201' }),
      error: T.Union([
        CloneType(DefinitionsUtilsError, { 'x-status-code': '400' }),
        CloneType(DefinitionsUtilsError, { 'x-status-code': '422' }),
      ]),
    },
  },
  '/drivers/{id}': {
    GET: {
      args: T.Object({
        params: T.Object({
          id: T.String({ 'x-in': 'path' }),
        }),
        query: T.Optional(
          T.Object({
            relations: T.Optional(T.String({ 'x-in': 'query' })),
          }),
        ),
      }),
      data: CloneType(DefinitionsModelsDriver, { 'x-status-code': '200' }),
      error: T.Union([
        CloneType(DefinitionsUtilsError, { 'x-status-code': '404' }),
        CloneType(DefinitionsUtilsError, { 'x-status-code': '500' }),
      ]),
    },
    PUT: {
      args: T.Object({
        params: T.Object({
          id: T.String({ 'x-in': 'path' }),
        }),
        query: T.Optional(
          T.Object({
            relations: T.Optional(T.String({ 'x-in': 'query' })),
          }),
        ),
      }),
      data: CloneType(DefinitionsModelsDriver, { 'x-status-code': '202' }),
      error: T.Union([
        CloneType(DefinitionsUtilsError, { 'x-status-code': '400' }),
        CloneType(DefinitionsUtilsError, { 'x-status-code': '404' }),
        CloneType(DefinitionsUtilsError, { 'x-status-code': '422' }),
      ]),
    },
    DELETE: {
      args: T.Object({
        params: T.Object({
          id: T.String({ 'x-in': 'path' }),
        }),
      }),
      data: T.Any({ 'x-status-code': '202' }),
      error: T.Union([
        CloneType(DefinitionsUtilsError, { 'x-status-code': '404' }),
        CloneType(DefinitionsUtilsError, { 'x-status-code': '422' }),
        CloneType(DefinitionsUtilsError, { 'x-status-code': '500' }),
      ]),
    },
  },
  '/orders': {
    GET: {
      args: T.Optional(
        T.Object({
          query: T.Optional(
            T.Object({
              page: T.Optional(T.Integer({ 'x-in': 'query' })),
              pageSize: T.Optional(T.Integer({ 'x-in': 'query' })),
            }),
          ),
        }),
      ),
      data: CloneType(DefinitionsModelsOrderPagination, {
        'x-status-code': '200',
      }),
      error: T.Union([
        CloneType(DefinitionsUtilsError, { 'x-status-code': '503' }),
      ]),
    },
    POST: {
      args: T.Void(),
      data: CloneType(DefinitionsModelsFirebaseOrder, {
        'x-status-code': '201',
      }),
      error: T.Union([
        CloneType(DefinitionsUtilsError, { 'x-status-code': '400' }),
        CloneType(DefinitionsUtilsError, { 'x-status-code': '422' }),
      ]),
    },
  },
  '/orders/{id}': {
    GET: {
      args: T.Object({
        params: T.Object({
          id: T.String({ 'x-in': 'path' }),
        }),
        query: T.Optional(
          T.Object({
            relations: T.Optional(T.String({ 'x-in': 'query' })),
          }),
        ),
      }),
      data: CloneType(DefinitionsModelsFirebaseOrder, {
        'x-status-code': '200',
      }),
      error: T.Union([
        CloneType(DefinitionsUtilsError, { 'x-status-code': '404' }),
        CloneType(DefinitionsUtilsError, { 'x-status-code': '500' }),
      ]),
    },
    PUT: {
      args: T.Object({
        params: T.Object({
          id: T.String({ 'x-in': 'path' }),
        }),
      }),
      data: CloneType(DefinitionsModelsFirebaseOrder, {
        'x-status-code': '202',
      }),
      error: T.Union([
        CloneType(DefinitionsUtilsError, { 'x-status-code': '400' }),
        CloneType(DefinitionsUtilsError, { 'x-status-code': '404' }),
        CloneType(DefinitionsUtilsError, { 'x-status-code': '422' }),
        CloneType(DefinitionsUtilsError, { 'x-status-code': '503' }),
      ]),
    },
    DELETE: {
      args: T.Object({
        params: T.Object({
          id: T.String({ 'x-in': 'path' }),
        }),
      }),
      data: T.Any({ 'x-status-code': '202' }),
      error: T.Union([
        CloneType(DefinitionsUtilsError, { 'x-status-code': '404' }),
        CloneType(DefinitionsUtilsError, { 'x-status-code': '422' }),
        CloneType(DefinitionsUtilsError, { 'x-status-code': '500' }),
      ]),
    },
  },
  '/users': {
    GET: {
      args: T.Optional(
        T.Object({
          query: T.Optional(
            T.Object({
              page: T.Optional(T.Integer({ 'x-in': 'query' })),
              pageSize: T.Optional(T.Integer({ 'x-in': 'query' })),
              relations: T.Optional(T.String({ 'x-in': 'query' })),
            }),
          ),
        }),
      ),
      data: CloneType(DefinitionsModelsUserPagination, {
        'x-status-code': '200',
      }),
      error: T.Union([
        CloneType(DefinitionsUtilsError, { 'x-status-code': '503' }),
      ]),
    },
    POST: {
      args: T.Void(),
      data: CloneType(DefinitionsModelsUser, { 'x-status-code': '201' }),
      error: T.Union([
        CloneType(DefinitionsUtilsError, { 'x-status-code': '400' }),
        CloneType(DefinitionsUtilsError, { 'x-status-code': '422' }),
      ]),
    },
  },
  '/users/{id}': {
    GET: {
      args: T.Object({
        params: T.Object({
          id: T.String({ 'x-in': 'path' }),
        }),
        query: T.Optional(
          T.Object({
            relations: T.Optional(T.String({ 'x-in': 'query' })),
          }),
        ),
      }),
      data: CloneType(DefinitionsModelsUser, { 'x-status-code': '200' }),
      error: T.Union([
        CloneType(DefinitionsUtilsError, { 'x-status-code': '404' }),
        CloneType(DefinitionsUtilsError, { 'x-status-code': '500' }),
      ]),
    },
    PUT: {
      args: T.Object({
        params: T.Object({
          id: T.String({ 'x-in': 'path' }),
        }),
        query: T.Optional(
          T.Object({
            relations: T.Optional(T.String({ 'x-in': 'query' })),
          }),
        ),
      }),
      data: CloneType(DefinitionsModelsUser, { 'x-status-code': '202' }),
      error: T.Union([
        CloneType(DefinitionsUtilsError, { 'x-status-code': '400' }),
        CloneType(DefinitionsUtilsError, { 'x-status-code': '404' }),
        CloneType(DefinitionsUtilsError, { 'x-status-code': '422' }),
        CloneType(DefinitionsUtilsError, { 'x-status-code': '503' }),
      ]),
    },
    DELETE: {
      args: T.Object({
        params: T.Object({
          id: T.String({ 'x-in': 'path' }),
        }),
      }),
      data: T.Any({ 'x-status-code': '202' }),
      error: T.Union([
        CloneType(DefinitionsUtilsError, { 'x-status-code': '404' }),
        CloneType(DefinitionsUtilsError, { 'x-status-code': '422' }),
        CloneType(DefinitionsUtilsError, { 'x-status-code': '500' }),
      ]),
    },
  },
};

const _components = {};

export { schema, _components as components };
