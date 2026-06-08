/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface LoginDto {
  /**
   * User email
   * @example "admin@icpna.studio"
   */
  email: string;
  /**
   * User password
   * @example "123456"
   */
  password: string;
}

export interface UserLoginInfoDto {
  /** @example 1 */
  id: number;
  /** @example "ICPNA Studio Admin" */
  name: string;
  /** @example "admin@icpna.studio" */
  email: string;
  /** @example ["admin"] */
  roles: string[];
}

export interface LoginResultDto {
  /** JWT Access Token */
  accessToken: string;
  /** User information */
  user: UserLoginInfoDto;
}

export interface BookResultDto {
  id: number;
  title: string;
  author?: string | null;
  publisher?: string | null;
  institution: string;
  edition?: string | null;
  level: "basic" | "intermediate" | "advanced";
  subLevel?: number | null;
  language: "english";
  targetProgram: "kids" | "juniors" | "adults";
  cefrEquivalent?: "a1" | "a2" | "b1" | "b2" | "c1" | "c2" | null;
  active: boolean;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
  /** @format date-time */
  deletedAt?: string | null;
  urlPreview?: string | null;
}

export interface PaginationMetaDto {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface BookListDto {
  data: BookResultDto[];
  meta: PaginationMetaDto;
}

export interface BookCreateDto {
  /** @example "American Big Picture" */
  title: string;
  /** @example "Ben Goldstein" */
  author?: string;
  /** @example "Richmond" */
  publisher?: string;
  /**
   * @default "ICPNA"
   * @example "ICPNA"
   */
  institution: string;
  /** @example "Intermediate 7" */
  edition?: string;
  /** @example "intermediate" */
  level: "basic" | "intermediate" | "advanced";
  /** @example 7 */
  subLevel?: number;
  /** @example "english" */
  language: "english";
  /** @example "adults" */
  targetProgram: "kids" | "juniors" | "adults";
  /** @example "b1" */
  cefrEquivalent?: "a1" | "a2" | "b1" | "b2" | "c1" | "c2";
  /**
   * @default true
   * @example true
   */
  active: boolean;
  /** @example "https://duxebhp63ladi.cloudfront.net/americanbigpicture/flipbook/b1p/abp8b1p_sb/index.html" */
  urlPreview?: string;
}

export interface BookUpdateDto {
  /** @example "American Big Picture" */
  title?: string;
  /** @example "Ben Goldstein" */
  author?: string;
  /** @example "Richmond" */
  publisher?: string;
  /**
   * @default "ICPNA"
   * @example "ICPNA"
   */
  institution?: string;
  /** @example "Intermediate 7" */
  edition?: string;
  /** @example "intermediate" */
  level?: "basic" | "intermediate" | "advanced";
  /** @example 7 */
  subLevel?: number;
  /** @example "english" */
  language?: "english";
  /** @example "adults" */
  targetProgram?: "kids" | "juniors" | "adults";
  /** @example "b1" */
  cefrEquivalent?: "a1" | "a2" | "b1" | "b2" | "c1" | "c2";
  /**
   * @default true
   * @example true
   */
  active?: boolean;
  /** @example "https://duxebhp63ladi.cloudfront.net/americanbigpicture/flipbook/b1p/abp8b1p_sb/index.html" */
  urlPreview?: string;
}

export interface BookIndexResultDto {
  id: number;
  title: string;
  page: string;
  skill:
    | "grammar"
    | "vocabulary"
    | "reading"
    | "listening"
    | "reading_listening"
    | "pronunciation"
    | "speaking"
    | "writing"
    | "functional_language"
    | "writing_bank"
    | "speaking_task"
    | "review"
    | "bring_it_together"
    | "grammar_reference"
    | "communication_bank"
    | "selected_transcripts"
    | "workbook";
  bookPage: number;
  bookId: number;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
  /** @format date-time */
  deletedAt?: string | null;
}

export interface BookIndexListDto {
  data: BookIndexResultDto[];
  meta: PaginationMetaDto;
}

export interface BookIndexCreateDto {
  /** @example "Units 7-9" */
  title: string;
  /** @example "page 2" */
  page: string;
  /** @example "grammar" */
  skill:
    | "grammar"
    | "vocabulary"
    | "reading"
    | "listening"
    | "reading_listening"
    | "pronunciation"
    | "speaking"
    | "writing"
    | "functional_language"
    | "writing_bank"
    | "speaking_task"
    | "review"
    | "bring_it_together"
    | "grammar_reference"
    | "communication_bank"
    | "selected_transcripts"
    | "workbook";
  /** @example 2 */
  bookPage: number;
  /** @example 1 */
  bookId: number;
}

export interface BookIndexUpdateDto {
  /** @example "Units 7-9" */
  title?: string;
  /** @example "page 2" */
  page?: string;
  /** @example "grammar" */
  skill?:
    | "grammar"
    | "vocabulary"
    | "reading"
    | "listening"
    | "reading_listening"
    | "pronunciation"
    | "speaking"
    | "writing"
    | "functional_language"
    | "writing_bank"
    | "speaking_task"
    | "review"
    | "bring_it_together"
    | "grammar_reference"
    | "communication_bank"
    | "selected_transcripts"
    | "workbook";
  /** @example 2 */
  bookPage?: number;
  /** @example 1 */
  bookId?: number;
}

export interface BookUnitResultDto {
  id: number;
  number: number;
  title: string;
  grammar?: string[] | null;
  vocabulary?: string[] | null;
  readingListening?: string[] | null;
  pronunciation?: string[] | null;
  bookPage: number;
  bookId: number;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
  /** @format date-time */
  deletedAt?: string | null;
}

export interface BookUnitListDto {
  data: BookUnitResultDto[];
  meta: PaginationMetaDto;
}

export interface BookUnitCreateDto {
  /** @example 7 */
  number: number;
  /** @example "Is This Yours?" */
  title: string;
  /** @example ["Quantifiers","Using one & ones","Articles"] */
  grammar?: string[];
  /** @example ["Belongings","Organization","Toys & games"] */
  vocabulary?: string[];
  /** @example ["Say Yes to Mess","The history of three objects"] */
  readingListening?: string[];
  /** @example ["One/ones","Intonation: Stress"] */
  pronunciation?: string[];
  /** @example 2 */
  bookPage: number;
  /** @example 1 */
  bookId: number;
}

export interface BookUnitUpdateDto {
  /** @example 7 */
  number?: number;
  /** @example "Is This Yours?" */
  title?: string;
  /** @example ["Quantifiers","Using one & ones","Articles"] */
  grammar?: string[];
  /** @example ["Belongings","Organization","Toys & games"] */
  vocabulary?: string[];
  /** @example ["Say Yes to Mess","The history of three objects"] */
  readingListening?: string[];
  /** @example ["One/ones","Intonation: Stress"] */
  pronunciation?: string[];
  /** @example 2 */
  bookPage?: number;
  /** @example 1 */
  bookId?: number;
}

export interface BookLessonResultDto {
  id: number;
  unitNumber: number;
  title: string;
  skill:
    | "grammar"
    | "vocabulary"
    | "reading"
    | "listening"
    | "reading_listening"
    | "pronunciation"
    | "speaking"
    | "writing"
    | "functional_language"
    | "writing_bank"
    | "speaking_task"
    | "review"
    | "bring_it_together"
    | "grammar_reference"
    | "communication_bank"
    | "selected_transcripts"
    | "workbook";
  topic?: string | null;
  activityNumber?: number | null;
  letterNumber?: string | null;
  instruction?: string | null;
  content?: object | null;
  bookPage: number;
  bookId: number;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
  /** @format date-time */
  deletedAt?: string | null;
}

export interface BookLessonListDto {
  data: BookLessonResultDto[];
  meta: PaginationMetaDto;
}

export interface BookLessonCreateDto {
  /** @example 7.1 */
  unitNumber: number;
  /** @example "Say Yes to Mess" */
  title: string;
  /** @example "reading" */
  skill:
    | "grammar"
    | "vocabulary"
    | "reading"
    | "listening"
    | "reading_listening"
    | "pronunciation"
    | "speaking"
    | "writing"
    | "functional_language"
    | "writing_bank"
    | "speaking_task"
    | "review"
    | "bring_it_together"
    | "grammar_reference"
    | "communication_bank"
    | "selected_transcripts"
    | "workbook";
  /** @example "Organization" */
  topic?: string;
  /** @example 1 */
  activityNumber?: number;
  /** @example "a" */
  letterNumber?: string;
  /** @example "Read the article and match statements 1-5 to paragraphs A-E." */
  instruction?: string;
  /** @example {"items":[]} */
  content?: object;
  /** @example 4 */
  bookPage: number;
  /** @example 1 */
  bookId: number;
}

export interface BookLessonUpdateDto {
  /** @example 7.1 */
  unitNumber?: number;
  /** @example "Say Yes to Mess" */
  title?: string;
  /** @example "reading" */
  skill?:
    | "grammar"
    | "vocabulary"
    | "reading"
    | "listening"
    | "reading_listening"
    | "pronunciation"
    | "speaking"
    | "writing"
    | "functional_language"
    | "writing_bank"
    | "speaking_task"
    | "review"
    | "bring_it_together"
    | "grammar_reference"
    | "communication_bank"
    | "selected_transcripts"
    | "workbook";
  /** @example "Organization" */
  topic?: string;
  /** @example 1 */
  activityNumber?: number;
  /** @example "a" */
  letterNumber?: string;
  /** @example "Read the article and match statements 1-5 to paragraphs A-E." */
  instruction?: string;
  /** @example {"items":[]} */
  content?: object;
  /** @example 4 */
  bookPage?: number;
  /** @example 1 */
  bookId?: number;
}

export interface BookPanelResultDto {
  id: number;
  title: string;
  theme?: string | null;
  subTheme?: string | null;
  instruction?: string | null;
  content?: object | null;
  bookPage: number;
  bookId: number;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
  /** @format date-time */
  deletedAt?: string | null;
}

export interface BookPanelListDto {
  data: BookPanelResultDto[];
  meta: PaginationMetaDto;
}

export interface BookPanelCreateDto {
  /** @example "Quantifiers" */
  title: string;
  /** @example "Grammar" */
  theme?: string;
  /** @example "Large and small quantity" */
  subTheme?: string;
  /** @example "Complete the grammar panel with a few, a little, many and much." */
  instruction?: string;
  /** @example {"sections":[]} */
  content?: object;
  /** @example 5 */
  bookPage: number;
  /** @example 1 */
  bookId: number;
}

export interface BookPanelUpdateDto {
  /** @example "Quantifiers" */
  title?: string;
  /** @example "Grammar" */
  theme?: string;
  /** @example "Large and small quantity" */
  subTheme?: string;
  /** @example "Complete the grammar panel with a few, a little, many and much." */
  instruction?: string;
  /** @example {"sections":[]} */
  content?: object;
  /** @example 5 */
  bookPage?: number;
  /** @example 1 */
  bookId?: number;
}

export interface BookAudioResultDto {
  id: number;
  url: string;
  audioIndex: string;
  transcription?: string | null;
  bookPage: number;
  metaMediaId?: number | null;
  bookId: number;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
  /** @format date-time */
  deletedAt?: string | null;
}

export interface BookAudioListDto {
  data: BookAudioResultDto[];
  meta: PaginationMetaDto;
}

export interface BookAudioCreateDto {
  /** @example "https://example.com/audio/7.1.mp3" */
  url: string;
  /** @example "7.1" */
  audioIndex: string;
  /** @example "Listen to a photographer explaining what the photos represent." */
  transcription?: string;
  /** @example 2 */
  bookPage: number;
  /** @example 123 */
  metaMediaId?: number;
  /** @example 1 */
  bookId: number;
}

export interface BookAudioUpdateDto {
  /** @example "https://example.com/audio/7.1.mp3" */
  url?: string;
  /** @example "7.1" */
  audioIndex?: string;
  /** @example "Listen to a photographer explaining what the photos represent." */
  transcription?: string;
  /** @example 2 */
  bookPage?: number;
  /** @example 123 */
  metaMediaId?: number;
  /** @example 1 */
  bookId?: number;
}

export interface BookImageResultDto {
  id: number;
  url: string;
  bookPage: number;
  metaMediaId?: number | null;
  bookId: number;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
  /** @format date-time */
  deletedAt?: string | null;
}

export interface BookImageListDto {
  data: BookImageResultDto[];
  meta: PaginationMetaDto;
}

export interface BookImageCreateDto {
  /** @example "https://example.com/images/book-7-page-2.png" */
  url: string;
  /** @example 2 */
  bookPage: number;
  /** @example 321 */
  metaMediaId?: number;
  /** @example 1 */
  bookId: number;
}

export interface BookImageUpdateDto {
  /** @example "https://example.com/images/book-7-page-2.png" */
  url?: string;
  /** @example 2 */
  bookPage?: number;
  /** @example 321 */
  metaMediaId?: number;
  /** @example 1 */
  bookId?: number;
}

export interface BookCaptureEventDto {
  /**
   * Tipo de evento de la captura
   * @example "page"
   */
  type: "start" | "page" | "complete" | "error";
  /** Datos asociados al tipo de evento */
  data: object;
}

export interface InsertIaDto {
  /**
   * ID del libro
   * @example 1
   */
  bookId: number;
  /**
   * Número de la página real del libro
   * @example 2
   */
  bookPage: number;
  /**
   * Imagen de la página en base64
   * @example "data:image/jpeg;base64,..."
   */
  image: string;
  /**
   * Badges/elementos a analizar e insertar
   * @example ["lesson","panel"]
   */
  badges: string[];
}

export interface FileUploadDto {
  /**
   * Archivo de imagen a subir
   * @format binary
   */
  file: File;
}

export interface FreeImageFileDto {
  filename: string;
  name: string;
  mime: string;
  extension: string;
  url: string;
  size?: number;
}

export interface FreeImageResultDto {
  name: string;
  extension: string;
  width: number;
  height: number;
  size: number;
  time: number;
  expiration: number;
  likes: number;
  description?: string | null;
  original_filename: string;
  is_animated: number;
  id_encoded: string;
  extension_name: string;
  size_formatted: string;
  filename: string;
  url: string;
  url_short: string;
  url_seo: string;
  url_viewer: string;
  url_viewer_preview: string;
  url_viewer_thumb: string;
  image: FreeImageFileDto;
  thumb: FreeImageFileDto;
  medium: FreeImageFileDto;
  display_url: string;
  display_width: number;
  display_height: number;
  views_label: string;
  likes_label: string;
  how_long_ago: string;
  date_fixed_peer: string;
  title: string;
  title_truncated: string;
  title_truncated_html: string;
  is_use_loader: boolean;
}

export interface UploadResultDto {
  success: boolean;
  data: FreeImageResultDto;
}

export interface UploadImageMetaResultDto {
  success: boolean;
  url: string;
  metaMediaId: string;
}

export interface UploadAudioUrlDto {
  /**
   * URL pública del archivo de audio que se descargará y subirá a Meta
   * @example "https://duxebhp63ladi.cloudfront.net/americanbigpicture/flipbook/b1p/abp6b1p_sb/files/SlidePage/190213150917177.mp3"
   */
  url: string;
}

export interface UploadAudioMetaResultDto {
  success: boolean;
  metaMediaId: string;
}

export interface BookPreviewDto {
  /**
   * Imagen en formato Base64 o URL
   * @example "data:image/jpeg;base64,..."
   */
  image: string;
  /**
   * ID del libro al que corresponden los inserts
   * @example 3
   */
  bookId?: number;
  /**
   * Número de página real del libro para pre-popular los registros
   * @example 1
   */
  bookPage?: number;
}

export interface BotResultDto {
  id: number;
  phone: string;
  name: string;
  prompt: string;
  model: "gpt" | "gemini";
}

export interface BotListDto {
  data: BotResultDto[];
  meta: PaginationMetaDto;
}

export interface BotCreateDto {
  /** @example "+51999999999" */
  phone: string;
  /** @example "ICPNA Agent" */
  name: string;
  /** @example "Eres un asistente de conversación..." */
  prompt: string;
  /** @example "gpt" */
  model: "gpt" | "gemini";
}

export interface BotUpdateDto {
  /** @example "+51999999999" */
  phone?: string;
  /** @example "ICPNA Agent" */
  name?: string;
  /** @example "Eres un asistente de conversación..." */
  prompt?: string;
  /** @example "gpt" */
  model?: "gpt" | "gemini";
}

export interface BotDeleteResultDto {
  /** @example true */
  success: boolean;
}

export interface InstanceResultDto {
  id: number;
  bot_id: number;
  whatsapp_type: "business";
  provider_type: "meta";
  business_id: string;
  phone_number_id: string;
  display_phone_number: string;
  waba_id: string;
  token: string;
}

export interface InstanceListDto {
  data: InstanceResultDto[];
  meta: PaginationMetaDto;
}

export interface InstanceCreateDto {
  /** @example 1 */
  bot_id: number;
  /** @example "business" */
  whatsapp_type: "business";
  /** @example "meta" */
  provider_type: "meta";
  /** @example "123456789012345" */
  business_id: string;
  /** @example "987654321098765" */
  phone_number_id: string;
  /** @example "+51999999999" */
  display_phone_number: string;
  /** @example "234567890123456" */
  waba_id: string;
  /** @example "EAAG..." */
  token: string;
}

export interface InstanceUpdateDto {
  /** @example 1 */
  bot_id?: number;
  /** @example "business" */
  whatsapp_type?: "business";
  /** @example "meta" */
  provider_type?: "meta";
  /** @example "123456789012345" */
  business_id?: string;
  /** @example "987654321098765" */
  phone_number_id?: string;
  /** @example "+51999999999" */
  display_phone_number?: string;
  /** @example "234567890123456" */
  waba_id?: string;
  /** @example "EAAG..." */
  token?: string;
}

export interface InstanceDeleteResultDto {
  /** @example true */
  success: boolean;
}

export interface UserResultDto {
  id: number;
  phone: string;
  enabled: boolean;
  /** @format date-time */
  enabledFrom?: string | null;
  /** @format date-time */
  enabledTo?: string | null;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
  /** @format date-time */
  deletedAt?: string | null;
}

export interface UserListDto {
  data: UserResultDto[];
  meta: PaginationMetaDto;
}

export interface UserCreateDto {
  /** @example "+51999999999" */
  phone: string;
  /** @default true */
  enabled?: boolean;
  /**
   * @format date-time
   * @example "2026-06-06T00:00:00.000Z"
   */
  enabledFrom?: string;
  /**
   * @format date-time
   * @example "2026-12-31T23:59:59.000Z"
   */
  enabledTo?: string;
}

export interface UserUpdateDto {
  /** @example "+51999999999" */
  phone?: string;
  /** @default true */
  enabled?: boolean;
  /**
   * @format date-time
   * @example "2026-06-06T00:00:00.000Z"
   */
  enabledFrom?: string;
  /**
   * @format date-time
   * @example "2026-12-31T23:59:59.000Z"
   */
  enabledTo?: string;
}

export interface UserDeleteResultDto {
  /** @example true */
  success: boolean;
}

export type AppGetHelloData = any;

export interface EngineVerifyWebhookParams {
  "hub.mode": string;
  "hub.verify_token": string;
  "hub.challenge": string;
}

export type EngineVerifyWebhookData = any;

/** @example {"object":"whatsapp_business_account","entry":[{"id":"3ac01333-459d-443c-8139-5c2b3e758e96","changes":[{"value":{"messaging_product":"whatsapp","metadata":{"display_phone_number":"51936081148","phone_number_id":"756536844216424"},"contacts":[{"profile":{"name":"Santos Cachorros"},"wa_id":"1443782653529215"}],"messages":[{"from":"51929073820","id":"f6aac6b9-7359-4c3e-b7d7-d75190fb68ca","timestamp":"1780932792536","text":{"body":"<MESSAGE_BODY_TEXT>"},"type":"text"}]},"field":"messages"}]}]} */
export type EngineRunFlowProductionPayload = any;

export type EngineRunFlowProductionData = any;

export type AuthLoginData = LoginResultDto;

export interface BookFindAllBooksParams {
  /** @default 1 */
  page?: number;
  /** @default 10 */
  limit?: number;
  search?: string;
  level?: "basic" | "intermediate" | "advanced";
  targetProgram?: "kids" | "juniors" | "adults";
  cefrEquivalent?: "a1" | "a2" | "b1" | "b2" | "c1" | "c2";
  active?: boolean;
}

export type BookFindAllBooksData = BookListDto;

export interface BookFindOneBookParams {
  id: number;
}

export type BookFindOneBookData = BookResultDto;

export type BookCreateBookData = BookResultDto;

export interface BookUpdateBookParams {
  id: number;
}

export type BookUpdateBookData = BookResultDto;

export interface BookDeleteBookParams {
  id: number;
}

export type BookDeleteBookData = BookResultDto;

export interface BookFindAllBookIndexesParams {
  /** @default 1 */
  page?: number;
  /** @default 10 */
  limit?: number;
  search?: string;
  bookId?: number;
  skill?:
    | "grammar"
    | "vocabulary"
    | "reading"
    | "listening"
    | "reading_listening"
    | "pronunciation"
    | "speaking"
    | "writing"
    | "functional_language"
    | "writing_bank"
    | "speaking_task"
    | "review"
    | "bring_it_together"
    | "grammar_reference"
    | "communication_bank"
    | "selected_transcripts"
    | "workbook";
}

export type BookFindAllBookIndexesData = BookIndexListDto;

export interface BookFindOneBookIndexParams {
  id: number;
}

export type BookFindOneBookIndexData = BookIndexResultDto;

export type BookCreateBookIndexData = BookIndexResultDto;

export interface BookUpdateBookIndexParams {
  id: number;
}

export type BookUpdateBookIndexData = BookIndexResultDto;

export interface BookDeleteBookIndexParams {
  id: number;
}

export type BookDeleteBookIndexData = BookIndexResultDto;

export interface BookFindAllBookUnitsParams {
  /** @default 1 */
  page?: number;
  /** @default 10 */
  limit?: number;
  search?: string;
  bookId?: number;
  number?: number;
}

export type BookFindAllBookUnitsData = BookUnitListDto;

export interface BookFindOneBookUnitParams {
  id: number;
}

export type BookFindOneBookUnitData = BookUnitResultDto;

export type BookCreateBookUnitData = BookUnitResultDto;

export interface BookUpdateBookUnitParams {
  id: number;
}

export type BookUpdateBookUnitData = BookUnitResultDto;

export interface BookDeleteBookUnitParams {
  id: number;
}

export type BookDeleteBookUnitData = BookUnitResultDto;

export interface BookFindAllBookLessonsParams {
  /** @default 1 */
  page?: number;
  /** @default 10 */
  limit?: number;
  search?: string;
  bookId?: number;
  skill?:
    | "grammar"
    | "vocabulary"
    | "reading"
    | "listening"
    | "reading_listening"
    | "pronunciation"
    | "speaking"
    | "writing"
    | "functional_language"
    | "writing_bank"
    | "speaking_task"
    | "review"
    | "bring_it_together"
    | "grammar_reference"
    | "communication_bank"
    | "selected_transcripts"
    | "workbook";
  unitNumber?: number;
}

export type BookFindAllBookLessonsData = BookLessonListDto;

export interface BookFindOneBookLessonParams {
  id: number;
}

export type BookFindOneBookLessonData = BookLessonResultDto;

export type BookCreateBookLessonData = BookLessonResultDto;

export interface BookUpdateBookLessonParams {
  id: number;
}

export type BookUpdateBookLessonData = BookLessonResultDto;

export interface BookDeleteBookLessonParams {
  id: number;
}

export type BookDeleteBookLessonData = BookLessonResultDto;

export interface BookFindAllBookPanelsParams {
  /** @default 1 */
  page?: number;
  /** @default 10 */
  limit?: number;
  search?: string;
  bookId?: number;
}

export type BookFindAllBookPanelsData = BookPanelListDto;

export interface BookFindOneBookPanelParams {
  id: number;
}

export type BookFindOneBookPanelData = BookPanelResultDto;

export type BookCreateBookPanelData = BookPanelResultDto;

export interface BookUpdateBookPanelParams {
  id: number;
}

export type BookUpdateBookPanelData = BookPanelResultDto;

export interface BookDeleteBookPanelParams {
  id: number;
}

export type BookDeleteBookPanelData = BookPanelResultDto;

export interface BookFindAllBookAudiosParams {
  /** @default 1 */
  page?: number;
  /** @default 10 */
  limit?: number;
  search?: string;
  bookId?: number;
  bookPage?: number;
}

export type BookFindAllBookAudiosData = BookAudioListDto;

export interface BookFindOneBookAudioParams {
  id: number;
}

export type BookFindOneBookAudioData = BookAudioResultDto;

export type BookCreateBookAudioData = BookAudioResultDto;

export interface BookUpdateBookAudioParams {
  id: number;
}

export type BookUpdateBookAudioData = BookAudioResultDto;

export interface BookDeleteBookAudioParams {
  id: number;
}

export type BookDeleteBookAudioData = BookAudioResultDto;

export interface BookFindAllBookImagesParams {
  /** @default 1 */
  page?: number;
  /** @default 10 */
  limit?: number;
  bookId?: number;
  bookPage?: number;
}

export type BookFindAllBookImagesData = BookImageListDto;

export interface BookFindOneBookImageParams {
  id: number;
}

export type BookFindOneBookImageData = BookImageResultDto;

export type BookCreateBookImageData = BookImageResultDto;

export interface BookUpdateBookImageParams {
  id: number;
}

export type BookUpdateBookImageData = BookImageResultDto;

export interface BookDeleteBookImageParams {
  id: number;
}

export type BookDeleteBookImageData = BookImageResultDto;

export interface BookAutoCaptureAmericanBigPictureParams {
  /**
   * URL base del flipbook
   * @example "https://duxebhp63ladi.cloudfront.net/americanbigpicture/flipbook/b1p/abp8b1p_sb/index.html"
   */
  bookUrl: string;
  /**
   * Página de inicio en el DOM
   * @example 5
   */
  startDomPage: number;
  /**
   * Página final en el DOM
   * @example 48
   */
  endDomPage: number;
  /**
   * Offset para restar y obtener la numeración real
   * @example 4
   */
  pageOffset: number;
  /**
   * Token JWT para autenticación SSE
   * @example "eyJhbGciOi..."
   */
  token?: string;
}

export type BookAutoCaptureAmericanBigPictureData = BookCaptureEventDto;

export type BookAutoInsertIaData = any;

export type StorageUploadFileData = UploadResultDto;

export type StorageUploadImageToMetaData = UploadImageMetaResultDto;

export type StorageUploadAudioUrlToMetaData = UploadAudioMetaResultDto;

export type BookAiPreviewBookIndexData = BookIndexCreateDto[];

export type BookAiPreviewBookUnitData = BookUnitCreateDto[];

export type BookAiPreviewBookLessonData = BookLessonCreateDto[];

export type BookAiPreviewBookPanelData = BookPanelCreateDto[];

export type BookAiPreviewBookAudioData = BookAudioCreateDto[];

export interface AgentFindAllBotsParams {
  /** @default 1 */
  page?: number;
  /** @default 10 */
  limit?: number;
  search?: string;
  model?: "gpt" | "gemini";
}

export type AgentFindAllBotsData = BotListDto;

export interface AgentFindOneBotParams {
  id: number;
}

export type AgentFindOneBotData = BotResultDto;

export type AgentCreateBotData = BotResultDto;

export interface AgentUpdateBotParams {
  id: number;
}

export type AgentUpdateBotData = BotResultDto;

export interface AgentDeleteBotParams {
  id: number;
}

export type AgentDeleteBotData = BotDeleteResultDto;

export interface AgentFindAllInstancesParams {
  /** @default 1 */
  page?: number;
  /** @default 10 */
  limit?: number;
  search?: string;
  botId?: number;
}

export type AgentFindAllInstancesData = InstanceListDto;

export interface AgentFindOneInstanceParams {
  id: number;
}

export type AgentFindOneInstanceData = InstanceResultDto;

export type AgentCreateInstanceData = InstanceResultDto;

export interface AgentUpdateInstanceParams {
  id: number;
}

export type AgentUpdateInstanceData = InstanceResultDto;

export interface AgentDeleteInstanceParams {
  id: number;
}

export type AgentDeleteInstanceData = InstanceDeleteResultDto;

export interface UserFindAllParams {
  /** @default 1 */
  page?: number;
  /** @default 10 */
  limit?: number;
  search?: string;
  enabled?: boolean;
}

export type UserFindAllData = UserListDto;

export interface UserFindOneParams {
  id: number;
}

export type UserFindOneData = UserResultDto;

export type UserCreateData = UserResultDto;

export interface UserUpdateParams {
  id: number;
}

export type UserUpdateData = UserResultDto;

export interface UserDeleteParams {
  id: number;
}

export type UserDeleteData = UserDeleteResultDto;

export namespace App {
  /**
   * No description
   * @tags App
   * @name AppGetHello
   * @request GET:/
   * @response `200` `AppGetHelloData`
   */
  export namespace AppGetHello {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = AppGetHelloData;
  }
}

export namespace Engine {
  /**
   * No description
   * @tags engine
   * @name EngineVerifyWebhook
   * @summary Verify Webhook from Meta
   * @request GET:/engine/flow
   * @response `200` `EngineVerifyWebhookData`
   */
  export namespace EngineVerifyWebhook {
    export type RequestParams = {};
    export type RequestQuery = {
      "hub.mode": string;
      "hub.verify_token": string;
      "hub.challenge": string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = EngineVerifyWebhookData;
  }

  /**
   * No description
   * @tags engine
   * @name EngineRunFlowProduction
   * @summary Run the production flow
   * @request POST:/engine/flow
   * @response `201` `EngineRunFlowProductionData`
   */
  export namespace EngineRunFlowProduction {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = EngineRunFlowProductionPayload;
    export type RequestHeaders = {};
    export type ResponseBody = EngineRunFlowProductionData;
  }
}

export namespace Auth {
  /**
   * No description
   * @tags auth
   * @name AuthLogin
   * @summary Login de usuario
   * @request POST:/auth/login
   * @response `200` `AuthLoginData`
   * @response `401` `void` Credenciales inválidas
   */
  export namespace AuthLogin {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = LoginDto;
    export type RequestHeaders = {};
    export type ResponseBody = AuthLoginData;
  }
}

export namespace Book {
  /**
   * No description
   * @tags book
   * @name BookFindAllBooks
   * @summary Get all books paginated
   * @request GET:/admin/book/find-all
   * @secure
   * @response `200` `BookFindAllBooksData`
   */
  export namespace BookFindAllBooks {
    export type RequestParams = {};
    export type RequestQuery = {
      /** @default 1 */
      page?: number;
      /** @default 10 */
      limit?: number;
      search?: string;
      level?: "basic" | "intermediate" | "advanced";
      targetProgram?: "kids" | "juniors" | "adults";
      cefrEquivalent?: "a1" | "a2" | "b1" | "b2" | "c1" | "c2";
      active?: boolean;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = BookFindAllBooksData;
  }

  /**
   * No description
   * @tags book
   * @name BookFindOneBook
   * @summary Get a book by ID
   * @request GET:/admin/book/find-one/{id}
   * @secure
   * @response `200` `BookFindOneBookData`
   */
  export namespace BookFindOneBook {
    export type RequestParams = {
      id: number;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = BookFindOneBookData;
  }

  /**
   * No description
   * @tags book
   * @name BookCreateBook
   * @summary Create a book
   * @request POST:/admin/book/create
   * @secure
   * @response `200` `BookCreateBookData`
   */
  export namespace BookCreateBook {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = BookCreateDto;
    export type RequestHeaders = {};
    export type ResponseBody = BookCreateBookData;
  }

  /**
   * No description
   * @tags book
   * @name BookUpdateBook
   * @summary Update a book
   * @request PATCH:/admin/book/update/{id}
   * @secure
   * @response `200` `BookUpdateBookData`
   */
  export namespace BookUpdateBook {
    export type RequestParams = {
      id: number;
    };
    export type RequestQuery = {};
    export type RequestBody = BookUpdateDto;
    export type RequestHeaders = {};
    export type ResponseBody = BookUpdateBookData;
  }

  /**
   * No description
   * @tags book
   * @name BookDeleteBook
   * @summary Soft delete a book
   * @request DELETE:/admin/book/delete/{id}
   * @secure
   * @response `200` `BookDeleteBookData`
   */
  export namespace BookDeleteBook {
    export type RequestParams = {
      id: number;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = BookDeleteBookData;
  }

  /**
   * No description
   * @tags book
   * @name BookFindAllBookIndexes
   * @summary Get all book index rows paginated
   * @request GET:/admin/book/index/find-all
   * @secure
   * @response `200` `BookFindAllBookIndexesData`
   */
  export namespace BookFindAllBookIndexes {
    export type RequestParams = {};
    export type RequestQuery = {
      /** @default 1 */
      page?: number;
      /** @default 10 */
      limit?: number;
      search?: string;
      bookId?: number;
      skill?:
        | "grammar"
        | "vocabulary"
        | "reading"
        | "listening"
        | "reading_listening"
        | "pronunciation"
        | "speaking"
        | "writing"
        | "functional_language"
        | "writing_bank"
        | "speaking_task"
        | "review"
        | "bring_it_together"
        | "grammar_reference"
        | "communication_bank"
        | "selected_transcripts"
        | "workbook";
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = BookFindAllBookIndexesData;
  }

  /**
   * No description
   * @tags book
   * @name BookFindOneBookIndex
   * @summary Get a book index row by ID
   * @request GET:/admin/book/index/find-one/{id}
   * @secure
   * @response `200` `BookFindOneBookIndexData`
   */
  export namespace BookFindOneBookIndex {
    export type RequestParams = {
      id: number;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = BookFindOneBookIndexData;
  }

  /**
   * No description
   * @tags book
   * @name BookCreateBookIndex
   * @summary Create a book index row
   * @request POST:/admin/book/index/create
   * @secure
   * @response `200` `BookCreateBookIndexData`
   */
  export namespace BookCreateBookIndex {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = BookIndexCreateDto;
    export type RequestHeaders = {};
    export type ResponseBody = BookCreateBookIndexData;
  }

  /**
   * No description
   * @tags book
   * @name BookUpdateBookIndex
   * @summary Update a book index row
   * @request PATCH:/admin/book/index/update/{id}
   * @secure
   * @response `200` `BookUpdateBookIndexData`
   */
  export namespace BookUpdateBookIndex {
    export type RequestParams = {
      id: number;
    };
    export type RequestQuery = {};
    export type RequestBody = BookIndexUpdateDto;
    export type RequestHeaders = {};
    export type ResponseBody = BookUpdateBookIndexData;
  }

  /**
   * No description
   * @tags book
   * @name BookDeleteBookIndex
   * @summary Soft delete a book index row
   * @request DELETE:/admin/book/index/delete/{id}
   * @secure
   * @response `200` `BookDeleteBookIndexData`
   */
  export namespace BookDeleteBookIndex {
    export type RequestParams = {
      id: number;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = BookDeleteBookIndexData;
  }

  /**
   * No description
   * @tags book
   * @name BookFindAllBookUnits
   * @summary Get all book units paginated
   * @request GET:/admin/book/unit/find-all
   * @secure
   * @response `200` `BookFindAllBookUnitsData`
   */
  export namespace BookFindAllBookUnits {
    export type RequestParams = {};
    export type RequestQuery = {
      /** @default 1 */
      page?: number;
      /** @default 10 */
      limit?: number;
      search?: string;
      bookId?: number;
      number?: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = BookFindAllBookUnitsData;
  }

  /**
   * No description
   * @tags book
   * @name BookFindOneBookUnit
   * @summary Get a book unit by ID
   * @request GET:/admin/book/unit/find-one/{id}
   * @secure
   * @response `200` `BookFindOneBookUnitData`
   */
  export namespace BookFindOneBookUnit {
    export type RequestParams = {
      id: number;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = BookFindOneBookUnitData;
  }

  /**
   * No description
   * @tags book
   * @name BookCreateBookUnit
   * @summary Create a book unit
   * @request POST:/admin/book/unit/create
   * @secure
   * @response `200` `BookCreateBookUnitData`
   */
  export namespace BookCreateBookUnit {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = BookUnitCreateDto;
    export type RequestHeaders = {};
    export type ResponseBody = BookCreateBookUnitData;
  }

  /**
   * No description
   * @tags book
   * @name BookUpdateBookUnit
   * @summary Update a book unit
   * @request PATCH:/admin/book/unit/update/{id}
   * @secure
   * @response `200` `BookUpdateBookUnitData`
   */
  export namespace BookUpdateBookUnit {
    export type RequestParams = {
      id: number;
    };
    export type RequestQuery = {};
    export type RequestBody = BookUnitUpdateDto;
    export type RequestHeaders = {};
    export type ResponseBody = BookUpdateBookUnitData;
  }

  /**
   * No description
   * @tags book
   * @name BookDeleteBookUnit
   * @summary Soft delete a book unit
   * @request DELETE:/admin/book/unit/delete/{id}
   * @secure
   * @response `200` `BookDeleteBookUnitData`
   */
  export namespace BookDeleteBookUnit {
    export type RequestParams = {
      id: number;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = BookDeleteBookUnitData;
  }

  /**
   * No description
   * @tags book
   * @name BookFindAllBookLessons
   * @summary Get all book lessons paginated
   * @request GET:/admin/book/lesson/find-all
   * @secure
   * @response `200` `BookFindAllBookLessonsData`
   */
  export namespace BookFindAllBookLessons {
    export type RequestParams = {};
    export type RequestQuery = {
      /** @default 1 */
      page?: number;
      /** @default 10 */
      limit?: number;
      search?: string;
      bookId?: number;
      skill?:
        | "grammar"
        | "vocabulary"
        | "reading"
        | "listening"
        | "reading_listening"
        | "pronunciation"
        | "speaking"
        | "writing"
        | "functional_language"
        | "writing_bank"
        | "speaking_task"
        | "review"
        | "bring_it_together"
        | "grammar_reference"
        | "communication_bank"
        | "selected_transcripts"
        | "workbook";
      unitNumber?: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = BookFindAllBookLessonsData;
  }

  /**
   * No description
   * @tags book
   * @name BookFindOneBookLesson
   * @summary Get a book lesson by ID
   * @request GET:/admin/book/lesson/find-one/{id}
   * @secure
   * @response `200` `BookFindOneBookLessonData`
   */
  export namespace BookFindOneBookLesson {
    export type RequestParams = {
      id: number;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = BookFindOneBookLessonData;
  }

  /**
   * No description
   * @tags book
   * @name BookCreateBookLesson
   * @summary Create a book lesson
   * @request POST:/admin/book/lesson/create
   * @secure
   * @response `200` `BookCreateBookLessonData`
   */
  export namespace BookCreateBookLesson {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = BookLessonCreateDto;
    export type RequestHeaders = {};
    export type ResponseBody = BookCreateBookLessonData;
  }

  /**
   * No description
   * @tags book
   * @name BookUpdateBookLesson
   * @summary Update a book lesson
   * @request PATCH:/admin/book/lesson/update/{id}
   * @secure
   * @response `200` `BookUpdateBookLessonData`
   */
  export namespace BookUpdateBookLesson {
    export type RequestParams = {
      id: number;
    };
    export type RequestQuery = {};
    export type RequestBody = BookLessonUpdateDto;
    export type RequestHeaders = {};
    export type ResponseBody = BookUpdateBookLessonData;
  }

  /**
   * No description
   * @tags book
   * @name BookDeleteBookLesson
   * @summary Soft delete a book lesson
   * @request DELETE:/admin/book/lesson/delete/{id}
   * @secure
   * @response `200` `BookDeleteBookLessonData`
   */
  export namespace BookDeleteBookLesson {
    export type RequestParams = {
      id: number;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = BookDeleteBookLessonData;
  }

  /**
   * No description
   * @tags book
   * @name BookFindAllBookPanels
   * @summary Get all book panels paginated
   * @request GET:/admin/book/panel/find-all
   * @secure
   * @response `200` `BookFindAllBookPanelsData`
   */
  export namespace BookFindAllBookPanels {
    export type RequestParams = {};
    export type RequestQuery = {
      /** @default 1 */
      page?: number;
      /** @default 10 */
      limit?: number;
      search?: string;
      bookId?: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = BookFindAllBookPanelsData;
  }

  /**
   * No description
   * @tags book
   * @name BookFindOneBookPanel
   * @summary Get a book panel by ID
   * @request GET:/admin/book/panel/find-one/{id}
   * @secure
   * @response `200` `BookFindOneBookPanelData`
   */
  export namespace BookFindOneBookPanel {
    export type RequestParams = {
      id: number;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = BookFindOneBookPanelData;
  }

  /**
   * No description
   * @tags book
   * @name BookCreateBookPanel
   * @summary Create a book panel
   * @request POST:/admin/book/panel/create
   * @secure
   * @response `200` `BookCreateBookPanelData`
   */
  export namespace BookCreateBookPanel {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = BookPanelCreateDto;
    export type RequestHeaders = {};
    export type ResponseBody = BookCreateBookPanelData;
  }

  /**
   * No description
   * @tags book
   * @name BookUpdateBookPanel
   * @summary Update a book panel
   * @request PATCH:/admin/book/panel/update/{id}
   * @secure
   * @response `200` `BookUpdateBookPanelData`
   */
  export namespace BookUpdateBookPanel {
    export type RequestParams = {
      id: number;
    };
    export type RequestQuery = {};
    export type RequestBody = BookPanelUpdateDto;
    export type RequestHeaders = {};
    export type ResponseBody = BookUpdateBookPanelData;
  }

  /**
   * No description
   * @tags book
   * @name BookDeleteBookPanel
   * @summary Soft delete a book panel
   * @request DELETE:/admin/book/panel/delete/{id}
   * @secure
   * @response `200` `BookDeleteBookPanelData`
   */
  export namespace BookDeleteBookPanel {
    export type RequestParams = {
      id: number;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = BookDeleteBookPanelData;
  }

  /**
   * No description
   * @tags book
   * @name BookFindAllBookAudios
   * @summary Get all book audios paginated
   * @request GET:/admin/book/audio/find-all
   * @secure
   * @response `200` `BookFindAllBookAudiosData`
   */
  export namespace BookFindAllBookAudios {
    export type RequestParams = {};
    export type RequestQuery = {
      /** @default 1 */
      page?: number;
      /** @default 10 */
      limit?: number;
      search?: string;
      bookId?: number;
      bookPage?: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = BookFindAllBookAudiosData;
  }

  /**
   * No description
   * @tags book
   * @name BookFindOneBookAudio
   * @summary Get a book audio by ID
   * @request GET:/admin/book/audio/find-one/{id}
   * @secure
   * @response `200` `BookFindOneBookAudioData`
   */
  export namespace BookFindOneBookAudio {
    export type RequestParams = {
      id: number;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = BookFindOneBookAudioData;
  }

  /**
   * No description
   * @tags book
   * @name BookCreateBookAudio
   * @summary Create a book audio
   * @request POST:/admin/book/audio/create
   * @secure
   * @response `200` `BookCreateBookAudioData`
   */
  export namespace BookCreateBookAudio {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = BookAudioCreateDto;
    export type RequestHeaders = {};
    export type ResponseBody = BookCreateBookAudioData;
  }

  /**
   * No description
   * @tags book
   * @name BookUpdateBookAudio
   * @summary Update a book audio
   * @request PATCH:/admin/book/audio/update/{id}
   * @secure
   * @response `200` `BookUpdateBookAudioData`
   */
  export namespace BookUpdateBookAudio {
    export type RequestParams = {
      id: number;
    };
    export type RequestQuery = {};
    export type RequestBody = BookAudioUpdateDto;
    export type RequestHeaders = {};
    export type ResponseBody = BookUpdateBookAudioData;
  }

  /**
   * No description
   * @tags book
   * @name BookDeleteBookAudio
   * @summary Soft delete a book audio
   * @request DELETE:/admin/book/audio/delete/{id}
   * @secure
   * @response `200` `BookDeleteBookAudioData`
   */
  export namespace BookDeleteBookAudio {
    export type RequestParams = {
      id: number;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = BookDeleteBookAudioData;
  }

  /**
   * No description
   * @tags book
   * @name BookFindAllBookImages
   * @summary Get all book images paginated
   * @request GET:/admin/book/image/find-all
   * @secure
   * @response `200` `BookFindAllBookImagesData`
   */
  export namespace BookFindAllBookImages {
    export type RequestParams = {};
    export type RequestQuery = {
      /** @default 1 */
      page?: number;
      /** @default 10 */
      limit?: number;
      bookId?: number;
      bookPage?: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = BookFindAllBookImagesData;
  }

  /**
   * No description
   * @tags book
   * @name BookFindOneBookImage
   * @summary Get a book image by ID
   * @request GET:/admin/book/image/find-one/{id}
   * @secure
   * @response `200` `BookFindOneBookImageData`
   */
  export namespace BookFindOneBookImage {
    export type RequestParams = {
      id: number;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = BookFindOneBookImageData;
  }

  /**
   * No description
   * @tags book
   * @name BookCreateBookImage
   * @summary Create a book image
   * @request POST:/admin/book/image/create
   * @secure
   * @response `200` `BookCreateBookImageData`
   */
  export namespace BookCreateBookImage {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = BookImageCreateDto;
    export type RequestHeaders = {};
    export type ResponseBody = BookCreateBookImageData;
  }

  /**
   * No description
   * @tags book
   * @name BookUpdateBookImage
   * @summary Update a book image
   * @request PATCH:/admin/book/image/update/{id}
   * @secure
   * @response `200` `BookUpdateBookImageData`
   */
  export namespace BookUpdateBookImage {
    export type RequestParams = {
      id: number;
    };
    export type RequestQuery = {};
    export type RequestBody = BookImageUpdateDto;
    export type RequestHeaders = {};
    export type ResponseBody = BookUpdateBookImageData;
  }

  /**
   * No description
   * @tags book
   * @name BookDeleteBookImage
   * @summary Soft delete a book image
   * @request DELETE:/admin/book/image/delete/{id}
   * @secure
   * @response `200` `BookDeleteBookImageData`
   */
  export namespace BookDeleteBookImage {
    export type RequestParams = {
      id: number;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = BookDeleteBookImageData;
  }
}

export namespace BookAuto {
  /**
   * No description
   * @tags book-auto
   * @name BookAutoCaptureAmericanBigPicture
   * @summary Capture flipbook pages as JPG screenshots using Playwright and stream via SSE
   * @request GET:/admin/book-auto/american-big-picture
   * @secure
   * @response `200` `BookAutoCaptureAmericanBigPictureData` Stream de eventos conteniendo metadatos y capturas de páginas en base64
   */
  export namespace BookAutoCaptureAmericanBigPicture {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * URL base del flipbook
       * @example "https://duxebhp63ladi.cloudfront.net/americanbigpicture/flipbook/b1p/abp8b1p_sb/index.html"
       */
      bookUrl: string;
      /**
       * Página de inicio en el DOM
       * @example 5
       */
      startDomPage: number;
      /**
       * Página final en el DOM
       * @example 48
       */
      endDomPage: number;
      /**
       * Offset para restar y obtener la numeración real
       * @example 4
       */
      pageOffset: number;
      /**
       * Token JWT para autenticación SSE
       * @example "eyJhbGciOi..."
       */
      token?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = BookAutoCaptureAmericanBigPictureData;
  }

  /**
   * No description
   * @tags book-auto
   * @name BookAutoInsertIa
   * @summary Sube imagen de la página, la registra, e identifica/guarda elementos mediante IA streaming de progreso SSE
   * @request POST:/admin/book-auto/insert-ia
   * @secure
   * @response `200` `BookAutoInsertIaData` Stream de eventos de progreso en el registro
   */
  export namespace BookAutoInsertIa {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = InsertIaDto;
    export type RequestHeaders = {};
    export type ResponseBody = BookAutoInsertIaData;
  }
}

export namespace Storage {
  /**
   * No description
   * @tags storage
   * @name StorageUploadFile
   * @summary Sube una imagen al proveedor externo freeimage.host
   * @request POST:/admin/storage/upload
   * @secure
   * @response `200` `StorageUploadFileData` Imagen subida exitosamente
   */
  export namespace StorageUploadFile {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = FileUploadDto;
    export type RequestHeaders = {};
    export type ResponseBody = StorageUploadFileData;
  }

  /**
   * No description
   * @tags storage
   * @name StorageUploadImageToMeta
   * @summary Sube una imagen a freeimage.host y luego a Meta, devolviendo el ID de Meta
   * @request POST:/admin/storage/upload-image-to-meta
   * @secure
   * @response `200` `StorageUploadImageToMetaData` Imagen subida exitosamente a Meta
   */
  export namespace StorageUploadImageToMeta {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = FileUploadDto;
    export type RequestHeaders = {};
    export type ResponseBody = StorageUploadImageToMetaData;
  }

  /**
   * No description
   * @tags storage
   * @name StorageUploadAudioUrlToMeta
   * @summary Descarga un audio desde una URL y lo sube a Meta, devolviendo el ID de Meta
   * @request POST:/admin/storage/upload-audio-url-to-meta
   * @secure
   * @response `200` `StorageUploadAudioUrlToMetaData` Audio subido exitosamente a Meta
   */
  export namespace StorageUploadAudioUrlToMeta {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = UploadAudioUrlDto;
    export type RequestHeaders = {};
    export type ResponseBody = StorageUploadAudioUrlToMetaData;
  }
}

export namespace BookAi {
  /**
   * No description
   * @tags book-ai
   * @name BookAiPreviewBookIndex
   * @summary Analiza una imagen de índice de libro y devuelve una lista de posibles inserts para book_index
   * @request POST:/admin/book-ai/preview-book-index
   * @secure
   * @response `200` `BookAiPreviewBookIndexData` Arreglo de posibles inserciones para la tabla book_index
   */
  export namespace BookAiPreviewBookIndex {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = BookPreviewDto;
    export type RequestHeaders = {};
    export type ResponseBody = BookAiPreviewBookIndexData;
  }

  /**
   * No description
   * @tags book-ai
   * @name BookAiPreviewBookUnit
   * @summary Analiza una imagen de portada de unidad y devuelve una lista de posibles inserts para book_unit
   * @request POST:/admin/book-ai/preview-book-unit
   * @secure
   * @response `200` `BookAiPreviewBookUnitData` Arreglo de posibles inserciones para la tabla book_unit
   */
  export namespace BookAiPreviewBookUnit {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = BookPreviewDto;
    export type RequestHeaders = {};
    export type ResponseBody = BookAiPreviewBookUnitData;
  }

  /**
   * No description
   * @tags book-ai
   * @name BookAiPreviewBookLesson
   * @summary Analiza una imagen de lección/actividad y devuelve una lista de posibles inserts para book_lesson
   * @request POST:/admin/book-ai/preview-book-lesson
   * @secure
   * @response `200` `BookAiPreviewBookLessonData` Arreglo de posibles inserciones para la tabla book_lesson
   */
  export namespace BookAiPreviewBookLesson {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = BookPreviewDto;
    export type RequestHeaders = {};
    export type ResponseBody = BookAiPreviewBookLessonData;
  }

  /**
   * No description
   * @tags book-ai
   * @name BookAiPreviewBookPanel
   * @summary Analiza una imagen de recuadro/panel y devuelve una lista de posibles inserts para book_panel
   * @request POST:/admin/book-ai/preview-book-panel
   * @secure
   * @response `200` `BookAiPreviewBookPanelData` Arreglo de posibles inserciones para la tabla book_panel
   */
  export namespace BookAiPreviewBookPanel {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = BookPreviewDto;
    export type RequestHeaders = {};
    export type ResponseBody = BookAiPreviewBookPanelData;
  }

  /**
   * No description
   * @tags book-ai
   * @name BookAiPreviewBookAudio
   * @summary Analiza una imagen de página y devuelve una lista de posibles inserts para book_audio
   * @request POST:/admin/book-ai/preview-book-audio
   * @secure
   * @response `200` `BookAiPreviewBookAudioData` Arreglo de posibles inserciones para la tabla book_audio
   */
  export namespace BookAiPreviewBookAudio {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = BookPreviewDto;
    export type RequestHeaders = {};
    export type ResponseBody = BookAiPreviewBookAudioData;
  }
}

export namespace Agent {
  /**
   * No description
   * @tags agent
   * @name AgentFindAllBots
   * @summary Get all agents paginated
   * @request GET:/admin/agent/find-all
   * @secure
   * @response `200` `AgentFindAllBotsData`
   */
  export namespace AgentFindAllBots {
    export type RequestParams = {};
    export type RequestQuery = {
      /** @default 1 */
      page?: number;
      /** @default 10 */
      limit?: number;
      search?: string;
      model?: "gpt" | "gemini";
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = AgentFindAllBotsData;
  }

  /**
   * No description
   * @tags agent
   * @name AgentFindOneBot
   * @summary Get an agent by ID
   * @request GET:/admin/agent/find-one/{id}
   * @secure
   * @response `200` `AgentFindOneBotData`
   */
  export namespace AgentFindOneBot {
    export type RequestParams = {
      id: number;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = AgentFindOneBotData;
  }

  /**
   * No description
   * @tags agent
   * @name AgentCreateBot
   * @summary Create an agent
   * @request POST:/admin/agent/create
   * @secure
   * @response `200` `AgentCreateBotData`
   */
  export namespace AgentCreateBot {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = BotCreateDto;
    export type RequestHeaders = {};
    export type ResponseBody = AgentCreateBotData;
  }

  /**
   * No description
   * @tags agent
   * @name AgentUpdateBot
   * @summary Update an agent
   * @request PATCH:/admin/agent/update/{id}
   * @secure
   * @response `200` `AgentUpdateBotData`
   */
  export namespace AgentUpdateBot {
    export type RequestParams = {
      id: number;
    };
    export type RequestQuery = {};
    export type RequestBody = BotUpdateDto;
    export type RequestHeaders = {};
    export type ResponseBody = AgentUpdateBotData;
  }

  /**
   * No description
   * @tags agent
   * @name AgentDeleteBot
   * @summary Delete an agent
   * @request DELETE:/admin/agent/delete/{id}
   * @secure
   * @response `200` `AgentDeleteBotData`
   */
  export namespace AgentDeleteBot {
    export type RequestParams = {
      id: number;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = AgentDeleteBotData;
  }

  /**
   * No description
   * @tags agent
   * @name AgentFindAllInstances
   * @summary Get all WhatsApp instances paginated
   * @request GET:/admin/agent/instance/find-all
   * @secure
   * @response `200` `AgentFindAllInstancesData`
   */
  export namespace AgentFindAllInstances {
    export type RequestParams = {};
    export type RequestQuery = {
      /** @default 1 */
      page?: number;
      /** @default 10 */
      limit?: number;
      search?: string;
      botId?: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = AgentFindAllInstancesData;
  }

  /**
   * No description
   * @tags agent
   * @name AgentFindOneInstance
   * @summary Get a WhatsApp instance by ID
   * @request GET:/admin/agent/instance/find-one/{id}
   * @secure
   * @response `200` `AgentFindOneInstanceData`
   */
  export namespace AgentFindOneInstance {
    export type RequestParams = {
      id: number;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = AgentFindOneInstanceData;
  }

  /**
   * No description
   * @tags agent
   * @name AgentCreateInstance
   * @summary Create a WhatsApp instance
   * @request POST:/admin/agent/instance/create
   * @secure
   * @response `200` `AgentCreateInstanceData`
   */
  export namespace AgentCreateInstance {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = InstanceCreateDto;
    export type RequestHeaders = {};
    export type ResponseBody = AgentCreateInstanceData;
  }

  /**
   * No description
   * @tags agent
   * @name AgentUpdateInstance
   * @summary Update a WhatsApp instance
   * @request PATCH:/admin/agent/instance/update/{id}
   * @secure
   * @response `200` `AgentUpdateInstanceData`
   */
  export namespace AgentUpdateInstance {
    export type RequestParams = {
      id: number;
    };
    export type RequestQuery = {};
    export type RequestBody = InstanceUpdateDto;
    export type RequestHeaders = {};
    export type ResponseBody = AgentUpdateInstanceData;
  }

  /**
   * No description
   * @tags agent
   * @name AgentDeleteInstance
   * @summary Delete a WhatsApp instance
   * @request DELETE:/admin/agent/instance/delete/{id}
   * @secure
   * @response `200` `AgentDeleteInstanceData`
   */
  export namespace AgentDeleteInstance {
    export type RequestParams = {
      id: number;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = AgentDeleteInstanceData;
  }
}

export namespace User {
  /**
   * No description
   * @tags user
   * @name UserFindAll
   * @summary Get all users paginated
   * @request GET:/admin/user/find-all
   * @secure
   * @response `200` `UserFindAllData`
   */
  export namespace UserFindAll {
    export type RequestParams = {};
    export type RequestQuery = {
      /** @default 1 */
      page?: number;
      /** @default 10 */
      limit?: number;
      search?: string;
      enabled?: boolean;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = UserFindAllData;
  }

  /**
   * No description
   * @tags user
   * @name UserFindOne
   * @summary Get a user by ID
   * @request GET:/admin/user/find-one/{id}
   * @secure
   * @response `200` `UserFindOneData`
   */
  export namespace UserFindOne {
    export type RequestParams = {
      id: number;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = UserFindOneData;
  }

  /**
   * No description
   * @tags user
   * @name UserCreate
   * @summary Create a user
   * @request POST:/admin/user/create
   * @secure
   * @response `200` `UserCreateData`
   */
  export namespace UserCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = UserCreateDto;
    export type RequestHeaders = {};
    export type ResponseBody = UserCreateData;
  }

  /**
   * No description
   * @tags user
   * @name UserUpdate
   * @summary Update a user
   * @request PATCH:/admin/user/update/{id}
   * @secure
   * @response `200` `UserUpdateData`
   */
  export namespace UserUpdate {
    export type RequestParams = {
      id: number;
    };
    export type RequestQuery = {};
    export type RequestBody = UserUpdateDto;
    export type RequestHeaders = {};
    export type ResponseBody = UserUpdateData;
  }

  /**
   * No description
   * @tags user
   * @name UserDelete
   * @summary Delete a user
   * @request DELETE:/admin/user/delete/{id}
   * @secure
   * @response `200` `UserDeleteData`
   */
  export namespace UserDelete {
    export type RequestParams = {
      id: number;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = UserDeleteData;
  }
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown>
  extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  JsonApi = "application/vnd.api+json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) =>
    fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter(
      (key) => "undefined" !== typeof query[key],
    );
    return keys
      .map((key) =>
        Array.isArray(query[key])
          ? this.addArrayQueryParam(query, key)
          : this.addQueryParam(query, key),
      )
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string")
        ? JSON.stringify(input)
        : input,
    [ContentType.JsonApi]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string")
        ? JSON.stringify(input)
        : input,
    [ContentType.Text]: (input: any) =>
      input !== null && typeof input !== "string"
        ? JSON.stringify(input)
        : input,
    [ContentType.FormData]: (input: any) => {
      if (input instanceof FormData) {
        return input;
      }

      return Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
              ? JSON.stringify(property)
              : `${property}`,
        );
        return formData;
      }, new FormData());
    },
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(
    params1: RequestParams,
    params2?: RequestParams,
  ): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (
    cancelToken: CancelToken,
  ): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(
      `${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`,
      {
        ...requestParams,
        headers: {
          ...(requestParams.headers || {}),
          ...(type && type !== ContentType.FormData
            ? { "Content-Type": type }
            : {}),
        },
        signal:
          (cancelToken
            ? this.createAbortSignal(cancelToken)
            : requestParams.signal) || null,
        body:
          typeof body === "undefined" || body === null
            ? null
            : payloadFormatter(body),
      },
    ).then(async (response) => {
      const r = response as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const responseToParse = responseFormat ? response.clone() : response;
      const data = !responseFormat
        ? r
        : await responseToParse[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title API Documentation
 * @version 1.0
 * @contact
 *
 * API endpoints for backend-cachorros
 */
export class Api<SecurityDataType extends unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  app = {
    /**
     * No description
     *
     * @tags App
     * @name AppGetHello
     * @request GET:/
     * @response `200` `AppGetHelloData`
     */
    getHello: (params: RequestParams = {}) =>
      this.http.request<AppGetHelloData, any>({
        path: `/`,
        method: "GET",
        ...params,
      }),
  };
  engine = {
    /**
     * No description
     *
     * @tags engine
     * @name EngineVerifyWebhook
     * @summary Verify Webhook from Meta
     * @request GET:/engine/flow
     * @response `200` `EngineVerifyWebhookData`
     */
    verifyWebhook: (
      query: EngineVerifyWebhookParams,
      params: RequestParams = {},
    ) =>
      this.http.request<EngineVerifyWebhookData, any>({
        path: `/engine/flow`,
        method: "GET",
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags engine
     * @name EngineRunFlowProduction
     * @summary Run the production flow
     * @request POST:/engine/flow
     * @response `201` `EngineRunFlowProductionData`
     */
    runFlowProduction: (
      data: EngineRunFlowProductionPayload,
      params: RequestParams = {},
    ) =>
      this.http.request<EngineRunFlowProductionData, any>({
        path: `/engine/flow`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),
  };
  auth = {
    /**
     * No description
     *
     * @tags auth
     * @name AuthLogin
     * @summary Login de usuario
     * @request POST:/auth/login
     * @response `200` `AuthLoginData`
     * @response `401` `void` Credenciales inválidas
     */
    login: (data: LoginDto, params: RequestParams = {}) =>
      this.http.request<AuthLoginData, void>({
        path: `/auth/login`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  book = {
    /**
     * No description
     *
     * @tags book
     * @name BookFindAllBooks
     * @summary Get all books paginated
     * @request GET:/admin/book/find-all
     * @secure
     * @response `200` `BookFindAllBooksData`
     */
    findAllBooks: (
      query: BookFindAllBooksParams = {},
      params: RequestParams = {},
    ) =>
      this.http.request<BookFindAllBooksData, any>({
        path: `/admin/book/find-all`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags book
     * @name BookFindOneBook
     * @summary Get a book by ID
     * @request GET:/admin/book/find-one/{id}
     * @secure
     * @response `200` `BookFindOneBookData`
     */
    findOneBook: (
      { id }: BookFindOneBookParams,
      params: RequestParams = {},
    ) =>
      this.http.request<BookFindOneBookData, any>({
        path: `/admin/book/find-one/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags book
     * @name BookCreateBook
     * @summary Create a book
     * @request POST:/admin/book/create
     * @secure
     * @response `200` `BookCreateBookData`
     */
    createBook: (data: BookCreateDto, params: RequestParams = {}) =>
      this.http.request<BookCreateBookData, any>({
        path: `/admin/book/create`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags book
     * @name BookUpdateBook
     * @summary Update a book
     * @request PATCH:/admin/book/update/{id}
     * @secure
     * @response `200` `BookUpdateBookData`
     */
    updateBook: (
      { id }: BookUpdateBookParams,
      data: BookUpdateDto,
      params: RequestParams = {},
    ) =>
      this.http.request<BookUpdateBookData, any>({
        path: `/admin/book/update/${id}`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags book
     * @name BookDeleteBook
     * @summary Soft delete a book
     * @request DELETE:/admin/book/delete/{id}
     * @secure
     * @response `200` `BookDeleteBookData`
     */
    deleteBook: (
      { id }: BookDeleteBookParams,
      params: RequestParams = {},
    ) =>
      this.http.request<BookDeleteBookData, any>({
        path: `/admin/book/delete/${id}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags book
     * @name BookFindAllBookIndexes
     * @summary Get all book index rows paginated
     * @request GET:/admin/book/index/find-all
     * @secure
     * @response `200` `BookFindAllBookIndexesData`
     */
    findAllBookIndexes: (
      query: BookFindAllBookIndexesParams = {},
      params: RequestParams = {},
    ) =>
      this.http.request<BookFindAllBookIndexesData, any>({
        path: `/admin/book/index/find-all`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags book
     * @name BookFindOneBookIndex
     * @summary Get a book index row by ID
     * @request GET:/admin/book/index/find-one/{id}
     * @secure
     * @response `200` `BookFindOneBookIndexData`
     */
    findOneBookIndex: (
      { id }: BookFindOneBookIndexParams,
      params: RequestParams = {},
    ) =>
      this.http.request<BookFindOneBookIndexData, any>({
        path: `/admin/book/index/find-one/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags book
     * @name BookCreateBookIndex
     * @summary Create a book index row
     * @request POST:/admin/book/index/create
     * @secure
     * @response `200` `BookCreateBookIndexData`
     */
    createBookIndex: (
      data: BookIndexCreateDto,
      params: RequestParams = {},
    ) =>
      this.http.request<BookCreateBookIndexData, any>({
        path: `/admin/book/index/create`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags book
     * @name BookUpdateBookIndex
     * @summary Update a book index row
     * @request PATCH:/admin/book/index/update/{id}
     * @secure
     * @response `200` `BookUpdateBookIndexData`
     */
    updateBookIndex: (
      { id }: BookUpdateBookIndexParams,
      data: BookIndexUpdateDto,
      params: RequestParams = {},
    ) =>
      this.http.request<BookUpdateBookIndexData, any>({
        path: `/admin/book/index/update/${id}`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags book
     * @name BookDeleteBookIndex
     * @summary Soft delete a book index row
     * @request DELETE:/admin/book/index/delete/{id}
     * @secure
     * @response `200` `BookDeleteBookIndexData`
     */
    deleteBookIndex: (
      { id }: BookDeleteBookIndexParams,
      params: RequestParams = {},
    ) =>
      this.http.request<BookDeleteBookIndexData, any>({
        path: `/admin/book/index/delete/${id}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags book
     * @name BookFindAllBookUnits
     * @summary Get all book units paginated
     * @request GET:/admin/book/unit/find-all
     * @secure
     * @response `200` `BookFindAllBookUnitsData`
     */
    findAllBookUnits: (
      query: BookFindAllBookUnitsParams = {},
      params: RequestParams = {},
    ) =>
      this.http.request<BookFindAllBookUnitsData, any>({
        path: `/admin/book/unit/find-all`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags book
     * @name BookFindOneBookUnit
     * @summary Get a book unit by ID
     * @request GET:/admin/book/unit/find-one/{id}
     * @secure
     * @response `200` `BookFindOneBookUnitData`
     */
    findOneBookUnit: (
      { id }: BookFindOneBookUnitParams,
      params: RequestParams = {},
    ) =>
      this.http.request<BookFindOneBookUnitData, any>({
        path: `/admin/book/unit/find-one/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags book
     * @name BookCreateBookUnit
     * @summary Create a book unit
     * @request POST:/admin/book/unit/create
     * @secure
     * @response `200` `BookCreateBookUnitData`
     */
    createBookUnit: (data: BookUnitCreateDto, params: RequestParams = {}) =>
      this.http.request<BookCreateBookUnitData, any>({
        path: `/admin/book/unit/create`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags book
     * @name BookUpdateBookUnit
     * @summary Update a book unit
     * @request PATCH:/admin/book/unit/update/{id}
     * @secure
     * @response `200` `BookUpdateBookUnitData`
     */
    updateBookUnit: (
      { id }: BookUpdateBookUnitParams,
      data: BookUnitUpdateDto,
      params: RequestParams = {},
    ) =>
      this.http.request<BookUpdateBookUnitData, any>({
        path: `/admin/book/unit/update/${id}`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags book
     * @name BookDeleteBookUnit
     * @summary Soft delete a book unit
     * @request DELETE:/admin/book/unit/delete/{id}
     * @secure
     * @response `200` `BookDeleteBookUnitData`
     */
    deleteBookUnit: (
      { id }: BookDeleteBookUnitParams,
      params: RequestParams = {},
    ) =>
      this.http.request<BookDeleteBookUnitData, any>({
        path: `/admin/book/unit/delete/${id}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags book
     * @name BookFindAllBookLessons
     * @summary Get all book lessons paginated
     * @request GET:/admin/book/lesson/find-all
     * @secure
     * @response `200` `BookFindAllBookLessonsData`
     */
    findAllBookLessons: (
      query: BookFindAllBookLessonsParams = {},
      params: RequestParams = {},
    ) =>
      this.http.request<BookFindAllBookLessonsData, any>({
        path: `/admin/book/lesson/find-all`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags book
     * @name BookFindOneBookLesson
     * @summary Get a book lesson by ID
     * @request GET:/admin/book/lesson/find-one/{id}
     * @secure
     * @response `200` `BookFindOneBookLessonData`
     */
    findOneBookLesson: (
      { id }: BookFindOneBookLessonParams,
      params: RequestParams = {},
    ) =>
      this.http.request<BookFindOneBookLessonData, any>({
        path: `/admin/book/lesson/find-one/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags book
     * @name BookCreateBookLesson
     * @summary Create a book lesson
     * @request POST:/admin/book/lesson/create
     * @secure
     * @response `200` `BookCreateBookLessonData`
     */
    createBookLesson: (
      data: BookLessonCreateDto,
      params: RequestParams = {},
    ) =>
      this.http.request<BookCreateBookLessonData, any>({
        path: `/admin/book/lesson/create`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags book
     * @name BookUpdateBookLesson
     * @summary Update a book lesson
     * @request PATCH:/admin/book/lesson/update/{id}
     * @secure
     * @response `200` `BookUpdateBookLessonData`
     */
    updateBookLesson: (
      { id }: BookUpdateBookLessonParams,
      data: BookLessonUpdateDto,
      params: RequestParams = {},
    ) =>
      this.http.request<BookUpdateBookLessonData, any>({
        path: `/admin/book/lesson/update/${id}`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags book
     * @name BookDeleteBookLesson
     * @summary Soft delete a book lesson
     * @request DELETE:/admin/book/lesson/delete/{id}
     * @secure
     * @response `200` `BookDeleteBookLessonData`
     */
    deleteBookLesson: (
      { id }: BookDeleteBookLessonParams,
      params: RequestParams = {},
    ) =>
      this.http.request<BookDeleteBookLessonData, any>({
        path: `/admin/book/lesson/delete/${id}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags book
     * @name BookFindAllBookPanels
     * @summary Get all book panels paginated
     * @request GET:/admin/book/panel/find-all
     * @secure
     * @response `200` `BookFindAllBookPanelsData`
     */
    findAllBookPanels: (
      query: BookFindAllBookPanelsParams = {},
      params: RequestParams = {},
    ) =>
      this.http.request<BookFindAllBookPanelsData, any>({
        path: `/admin/book/panel/find-all`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags book
     * @name BookFindOneBookPanel
     * @summary Get a book panel by ID
     * @request GET:/admin/book/panel/find-one/{id}
     * @secure
     * @response `200` `BookFindOneBookPanelData`
     */
    findOneBookPanel: (
      { id }: BookFindOneBookPanelParams,
      params: RequestParams = {},
    ) =>
      this.http.request<BookFindOneBookPanelData, any>({
        path: `/admin/book/panel/find-one/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags book
     * @name BookCreateBookPanel
     * @summary Create a book panel
     * @request POST:/admin/book/panel/create
     * @secure
     * @response `200` `BookCreateBookPanelData`
     */
    createBookPanel: (
      data: BookPanelCreateDto,
      params: RequestParams = {},
    ) =>
      this.http.request<BookCreateBookPanelData, any>({
        path: `/admin/book/panel/create`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags book
     * @name BookUpdateBookPanel
     * @summary Update a book panel
     * @request PATCH:/admin/book/panel/update/{id}
     * @secure
     * @response `200` `BookUpdateBookPanelData`
     */
    updateBookPanel: (
      { id }: BookUpdateBookPanelParams,
      data: BookPanelUpdateDto,
      params: RequestParams = {},
    ) =>
      this.http.request<BookUpdateBookPanelData, any>({
        path: `/admin/book/panel/update/${id}`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags book
     * @name BookDeleteBookPanel
     * @summary Soft delete a book panel
     * @request DELETE:/admin/book/panel/delete/{id}
     * @secure
     * @response `200` `BookDeleteBookPanelData`
     */
    deleteBookPanel: (
      { id }: BookDeleteBookPanelParams,
      params: RequestParams = {},
    ) =>
      this.http.request<BookDeleteBookPanelData, any>({
        path: `/admin/book/panel/delete/${id}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags book
     * @name BookFindAllBookAudios
     * @summary Get all book audios paginated
     * @request GET:/admin/book/audio/find-all
     * @secure
     * @response `200` `BookFindAllBookAudiosData`
     */
    findAllBookAudios: (
      query: BookFindAllBookAudiosParams = {},
      params: RequestParams = {},
    ) =>
      this.http.request<BookFindAllBookAudiosData, any>({
        path: `/admin/book/audio/find-all`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags book
     * @name BookFindOneBookAudio
     * @summary Get a book audio by ID
     * @request GET:/admin/book/audio/find-one/{id}
     * @secure
     * @response `200` `BookFindOneBookAudioData`
     */
    findOneBookAudio: (
      { id }: BookFindOneBookAudioParams,
      params: RequestParams = {},
    ) =>
      this.http.request<BookFindOneBookAudioData, any>({
        path: `/admin/book/audio/find-one/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags book
     * @name BookCreateBookAudio
     * @summary Create a book audio
     * @request POST:/admin/book/audio/create
     * @secure
     * @response `200` `BookCreateBookAudioData`
     */
    createBookAudio: (
      data: BookAudioCreateDto,
      params: RequestParams = {},
    ) =>
      this.http.request<BookCreateBookAudioData, any>({
        path: `/admin/book/audio/create`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags book
     * @name BookUpdateBookAudio
     * @summary Update a book audio
     * @request PATCH:/admin/book/audio/update/{id}
     * @secure
     * @response `200` `BookUpdateBookAudioData`
     */
    updateBookAudio: (
      { id }: BookUpdateBookAudioParams,
      data: BookAudioUpdateDto,
      params: RequestParams = {},
    ) =>
      this.http.request<BookUpdateBookAudioData, any>({
        path: `/admin/book/audio/update/${id}`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags book
     * @name BookDeleteBookAudio
     * @summary Soft delete a book audio
     * @request DELETE:/admin/book/audio/delete/{id}
     * @secure
     * @response `200` `BookDeleteBookAudioData`
     */
    deleteBookAudio: (
      { id }: BookDeleteBookAudioParams,
      params: RequestParams = {},
    ) =>
      this.http.request<BookDeleteBookAudioData, any>({
        path: `/admin/book/audio/delete/${id}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags book
     * @name BookFindAllBookImages
     * @summary Get all book images paginated
     * @request GET:/admin/book/image/find-all
     * @secure
     * @response `200` `BookFindAllBookImagesData`
     */
    findAllBookImages: (
      query: BookFindAllBookImagesParams = {},
      params: RequestParams = {},
    ) =>
      this.http.request<BookFindAllBookImagesData, any>({
        path: `/admin/book/image/find-all`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags book
     * @name BookFindOneBookImage
     * @summary Get a book image by ID
     * @request GET:/admin/book/image/find-one/{id}
     * @secure
     * @response `200` `BookFindOneBookImageData`
     */
    findOneBookImage: (
      { id }: BookFindOneBookImageParams,
      params: RequestParams = {},
    ) =>
      this.http.request<BookFindOneBookImageData, any>({
        path: `/admin/book/image/find-one/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags book
     * @name BookCreateBookImage
     * @summary Create a book image
     * @request POST:/admin/book/image/create
     * @secure
     * @response `200` `BookCreateBookImageData`
     */
    createBookImage: (
      data: BookImageCreateDto,
      params: RequestParams = {},
    ) =>
      this.http.request<BookCreateBookImageData, any>({
        path: `/admin/book/image/create`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags book
     * @name BookUpdateBookImage
     * @summary Update a book image
     * @request PATCH:/admin/book/image/update/{id}
     * @secure
     * @response `200` `BookUpdateBookImageData`
     */
    updateBookImage: (
      { id }: BookUpdateBookImageParams,
      data: BookImageUpdateDto,
      params: RequestParams = {},
    ) =>
      this.http.request<BookUpdateBookImageData, any>({
        path: `/admin/book/image/update/${id}`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags book
     * @name BookDeleteBookImage
     * @summary Soft delete a book image
     * @request DELETE:/admin/book/image/delete/{id}
     * @secure
     * @response `200` `BookDeleteBookImageData`
     */
    deleteBookImage: (
      { id }: BookDeleteBookImageParams,
      params: RequestParams = {},
    ) =>
      this.http.request<BookDeleteBookImageData, any>({
        path: `/admin/book/image/delete/${id}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  bookAuto = {
    /**
     * No description
     *
     * @tags book-auto
     * @name BookAutoCaptureAmericanBigPicture
     * @summary Capture flipbook pages as JPG screenshots using Playwright and stream via SSE
     * @request GET:/admin/book-auto/american-big-picture
     * @secure
     * @response `200` `BookAutoCaptureAmericanBigPictureData` Stream de eventos conteniendo metadatos y capturas de páginas en base64
     */
    "book-autoCaptureAmericanBigPicture": (
      query: BookAutoCaptureAmericanBigPictureParams,
      params: RequestParams = {},
    ) =>
      this.http.request<BookAutoCaptureAmericanBigPictureData, any>({
        path: `/admin/book-auto/american-big-picture`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags book-auto
     * @name BookAutoInsertIa
     * @summary Sube imagen de la página, la registra, e identifica/guarda elementos mediante IA streaming de progreso SSE
     * @request POST:/admin/book-auto/insert-ia
     * @secure
     * @response `200` `BookAutoInsertIaData` Stream de eventos de progreso en el registro
     */
    "book-autoInsertIa": (data: InsertIaDto, params: RequestParams = {}) =>
      this.http.request<BookAutoInsertIaData, any>({
        path: `/admin/book-auto/insert-ia`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),
  };
  storage = {
    /**
     * No description
     *
     * @tags storage
     * @name StorageUploadFile
     * @summary Sube una imagen al proveedor externo freeimage.host
     * @request POST:/admin/storage/upload
     * @secure
     * @response `200` `StorageUploadFileData` Imagen subida exitosamente
     */
    uploadFile: (data: FileUploadDto, params: RequestParams = {}) =>
      this.http.request<StorageUploadFileData, any>({
        path: `/admin/storage/upload`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags storage
     * @name StorageUploadImageToMeta
     * @summary Sube una imagen a freeimage.host y luego a Meta, devolviendo el ID de Meta
     * @request POST:/admin/storage/upload-image-to-meta
     * @secure
     * @response `200` `StorageUploadImageToMetaData` Imagen subida exitosamente a Meta
     */
    uploadImageToMeta: (
      data: FileUploadDto,
      params: RequestParams = {},
    ) =>
      this.http.request<StorageUploadImageToMetaData, any>({
        path: `/admin/storage/upload-image-to-meta`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags storage
     * @name StorageUploadAudioUrlToMeta
     * @summary Descarga un audio desde una URL y lo sube a Meta, devolviendo el ID de Meta
     * @request POST:/admin/storage/upload-audio-url-to-meta
     * @secure
     * @response `200` `StorageUploadAudioUrlToMetaData` Audio subido exitosamente a Meta
     */
    uploadAudioUrlToMeta: (
      data: UploadAudioUrlDto,
      params: RequestParams = {},
    ) =>
      this.http.request<StorageUploadAudioUrlToMetaData, any>({
        path: `/admin/storage/upload-audio-url-to-meta`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  bookAi = {
    /**
     * No description
     *
     * @tags book-ai
     * @name BookAiPreviewBookIndex
     * @summary Analiza una imagen de índice de libro y devuelve una lista de posibles inserts para book_index
     * @request POST:/admin/book-ai/preview-book-index
     * @secure
     * @response `200` `BookAiPreviewBookIndexData` Arreglo de posibles inserciones para la tabla book_index
     */
    "book-aiPreviewBookIndex": (
      data: BookPreviewDto,
      params: RequestParams = {},
    ) =>
      this.http.request<BookAiPreviewBookIndexData, any>({
        path: `/admin/book-ai/preview-book-index`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags book-ai
     * @name BookAiPreviewBookUnit
     * @summary Analiza una imagen de portada de unidad y devuelve una lista de posibles inserts para book_unit
     * @request POST:/admin/book-ai/preview-book-unit
     * @secure
     * @response `200` `BookAiPreviewBookUnitData` Arreglo de posibles inserciones para la tabla book_unit
     */
    "book-aiPreviewBookUnit": (
      data: BookPreviewDto,
      params: RequestParams = {},
    ) =>
      this.http.request<BookAiPreviewBookUnitData, any>({
        path: `/admin/book-ai/preview-book-unit`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags book-ai
     * @name BookAiPreviewBookLesson
     * @summary Analiza una imagen de lección/actividad y devuelve una lista de posibles inserts para book_lesson
     * @request POST:/admin/book-ai/preview-book-lesson
     * @secure
     * @response `200` `BookAiPreviewBookLessonData` Arreglo de posibles inserciones para la tabla book_lesson
     */
    "book-aiPreviewBookLesson": (
      data: BookPreviewDto,
      params: RequestParams = {},
    ) =>
      this.http.request<BookAiPreviewBookLessonData, any>({
        path: `/admin/book-ai/preview-book-lesson`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags book-ai
     * @name BookAiPreviewBookPanel
     * @summary Analiza una imagen de recuadro/panel y devuelve una lista de posibles inserts para book_panel
     * @request POST:/admin/book-ai/preview-book-panel
     * @secure
     * @response `200` `BookAiPreviewBookPanelData` Arreglo de posibles inserciones para la tabla book_panel
     */
    "book-aiPreviewBookPanel": (
      data: BookPreviewDto,
      params: RequestParams = {},
    ) =>
      this.http.request<BookAiPreviewBookPanelData, any>({
        path: `/admin/book-ai/preview-book-panel`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags book-ai
     * @name BookAiPreviewBookAudio
     * @summary Analiza una imagen de página y devuelve una lista de posibles inserts para book_audio
     * @request POST:/admin/book-ai/preview-book-audio
     * @secure
     * @response `200` `BookAiPreviewBookAudioData` Arreglo de posibles inserciones para la tabla book_audio
     */
    "book-aiPreviewBookAudio": (
      data: BookPreviewDto,
      params: RequestParams = {},
    ) =>
      this.http.request<BookAiPreviewBookAudioData, any>({
        path: `/admin/book-ai/preview-book-audio`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  agent = {
    /**
     * No description
     *
     * @tags agent
     * @name AgentFindAllBots
     * @summary Get all agents paginated
     * @request GET:/admin/agent/find-all
     * @secure
     * @response `200` `AgentFindAllBotsData`
     */
    findAllBots: (
      query: AgentFindAllBotsParams = {},
      params: RequestParams = {},
    ) =>
      this.http.request<AgentFindAllBotsData, any>({
        path: `/admin/agent/find-all`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags agent
     * @name AgentFindOneBot
     * @summary Get an agent by ID
     * @request GET:/admin/agent/find-one/{id}
     * @secure
     * @response `200` `AgentFindOneBotData`
     */
    findOneBot: (
      { id }: AgentFindOneBotParams,
      params: RequestParams = {},
    ) =>
      this.http.request<AgentFindOneBotData, any>({
        path: `/admin/agent/find-one/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags agent
     * @name AgentCreateBot
     * @summary Create an agent
     * @request POST:/admin/agent/create
     * @secure
     * @response `200` `AgentCreateBotData`
     */
    createBot: (data: BotCreateDto, params: RequestParams = {}) =>
      this.http.request<AgentCreateBotData, any>({
        path: `/admin/agent/create`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags agent
     * @name AgentUpdateBot
     * @summary Update an agent
     * @request PATCH:/admin/agent/update/{id}
     * @secure
     * @response `200` `AgentUpdateBotData`
     */
    updateBot: (
      { id }: AgentUpdateBotParams,
      data: BotUpdateDto,
      params: RequestParams = {},
    ) =>
      this.http.request<AgentUpdateBotData, any>({
        path: `/admin/agent/update/${id}`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags agent
     * @name AgentDeleteBot
     * @summary Delete an agent
     * @request DELETE:/admin/agent/delete/{id}
     * @secure
     * @response `200` `AgentDeleteBotData`
     */
    deleteBot: (
      { id }: AgentDeleteBotParams,
      params: RequestParams = {},
    ) =>
      this.http.request<AgentDeleteBotData, any>({
        path: `/admin/agent/delete/${id}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags agent
     * @name AgentFindAllInstances
     * @summary Get all WhatsApp instances paginated
     * @request GET:/admin/agent/instance/find-all
     * @secure
     * @response `200` `AgentFindAllInstancesData`
     */
    findAllInstances: (
      query: AgentFindAllInstancesParams = {},
      params: RequestParams = {},
    ) =>
      this.http.request<AgentFindAllInstancesData, any>({
        path: `/admin/agent/instance/find-all`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags agent
     * @name AgentFindOneInstance
     * @summary Get a WhatsApp instance by ID
     * @request GET:/admin/agent/instance/find-one/{id}
     * @secure
     * @response `200` `AgentFindOneInstanceData`
     */
    findOneInstance: (
      { id }: AgentFindOneInstanceParams,
      params: RequestParams = {},
    ) =>
      this.http.request<AgentFindOneInstanceData, any>({
        path: `/admin/agent/instance/find-one/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags agent
     * @name AgentCreateInstance
     * @summary Create a WhatsApp instance
     * @request POST:/admin/agent/instance/create
     * @secure
     * @response `200` `AgentCreateInstanceData`
     */
    createInstance: (
      data: InstanceCreateDto,
      params: RequestParams = {},
    ) =>
      this.http.request<AgentCreateInstanceData, any>({
        path: `/admin/agent/instance/create`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags agent
     * @name AgentUpdateInstance
     * @summary Update a WhatsApp instance
     * @request PATCH:/admin/agent/instance/update/{id}
     * @secure
     * @response `200` `AgentUpdateInstanceData`
     */
    updateInstance: (
      { id }: AgentUpdateInstanceParams,
      data: InstanceUpdateDto,
      params: RequestParams = {},
    ) =>
      this.http.request<AgentUpdateInstanceData, any>({
        path: `/admin/agent/instance/update/${id}`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags agent
     * @name AgentDeleteInstance
     * @summary Delete a WhatsApp instance
     * @request DELETE:/admin/agent/instance/delete/{id}
     * @secure
     * @response `200` `AgentDeleteInstanceData`
     */
    deleteInstance: (
      { id }: AgentDeleteInstanceParams,
      params: RequestParams = {},
    ) =>
      this.http.request<AgentDeleteInstanceData, any>({
        path: `/admin/agent/instance/delete/${id}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  user = {
    /**
     * No description
     *
     * @tags user
     * @name UserFindAll
     * @summary Get all users paginated
     * @request GET:/admin/user/find-all
     * @secure
     * @response `200` `UserFindAllData`
     */
    findAll: (query: UserFindAllParams = {}, params: RequestParams = {}) =>
      this.http.request<UserFindAllData, any>({
        path: `/admin/user/find-all`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags user
     * @name UserFindOne
     * @summary Get a user by ID
     * @request GET:/admin/user/find-one/{id}
     * @secure
     * @response `200` `UserFindOneData`
     */
    findOne: ({ id }: UserFindOneParams, params: RequestParams = {}) =>
      this.http.request<UserFindOneData, any>({
        path: `/admin/user/find-one/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags user
     * @name UserCreate
     * @summary Create a user
     * @request POST:/admin/user/create
     * @secure
     * @response `200` `UserCreateData`
     */
    create: (data: UserCreateDto, params: RequestParams = {}) =>
      this.http.request<UserCreateData, any>({
        path: `/admin/user/create`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags user
     * @name UserUpdate
     * @summary Update a user
     * @request PATCH:/admin/user/update/{id}
     * @secure
     * @response `200` `UserUpdateData`
     */
    update: (
      { id }: UserUpdateParams,
      data: UserUpdateDto,
      params: RequestParams = {},
    ) =>
      this.http.request<UserUpdateData, any>({
        path: `/admin/user/update/${id}`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags user
     * @name UserDelete
     * @summary Delete a user
     * @request DELETE:/admin/user/delete/{id}
     * @secure
     * @response `200` `UserDeleteData`
     */
    delete: ({ id }: UserDeleteParams, params: RequestParams = {}) =>
      this.http.request<UserDeleteData, any>({
        path: `/admin/user/delete/${id}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),
  };
}

/**
 * ==============================================================================
 *  UTILITARIOS DE TIPOS PARA FRONTEND
 * ==============================================================================
 */

/**
 * Extrae el tipo de respuesta (data) de un método de la API
 * @example ApiResponse<"clientes", "findAll"> → PaginatedClienteResultDto
 */
export type ApiResponse<
  Module extends keyof Api<unknown>,
  Method extends keyof Api<unknown>[Module]
> = Api<unknown>[Module][Method] extends (...args: any) => Promise<{ data: infer Data }>
  ? Data
  : never;

/**
 * Extrae todos los argumentos de un método de la API
 */
type ApiArgs<
  Module extends keyof Api<unknown>,
  Method extends keyof Api<unknown>[Module]
> = Parameters<
  Api<unknown>[Module][Method] extends (...args: any) => any ? Api<unknown>[Module][Method] : never
>;

/**
 * Extrae el tipo del body (data) de un método de la API
 * Busca el parámetro que se llama "data" en la firma del método
 * @example ApiBody<"clientes", "create"> → ClienteCreateDto
 * @example ApiBody<"clientes", "update"> → ClienteUpdateDto
 */
export type ApiBody<
  Module extends keyof Api<unknown>,
  Method extends keyof Api<unknown>[Module]
> = Required<ApiArgs<Module, Method>> extends [any, any, any, ...any[]]
  ? ApiArgs<Module, Method>[1]
  : Required<ApiArgs<Module, Method>> extends [any, any, ...any[]]
    ? ApiArgs<Module, Method>[0]
    : never;

/**
 * Extrae el tipo de los query params de un método de la API
 * Busca el parámetro que se llama "query" en la firma del método
 * @example ApiQuery<"clientes", "findAll"> → { page?: number, limit?: number, search?: string, ... }
 */
export type ApiQuery<
  Module extends keyof Api<unknown>,
  Method extends keyof Api<unknown>[Module]
> = ApiArgs<Module, Method> extends [infer Query, ...any[]]
  ? Query
  : never;

/**
 * Extrae el tipo de un parámetro específico (path param) de un método de la API
 * @example ApiParam<"clientes", "update", "id"> → number
 * @example ApiParam<"vehiculos", "findOne", "id"> → number
 */
export type ApiParam<
  Module extends keyof Api<unknown>,
  Method extends keyof Api<unknown>[Module],
  ParamName extends ApiArgs<Module, Method> extends [infer Arg1, ...any[]]
    ? keyof Arg1
    : never
> = ApiArgs<Module, Method> extends [infer Arg1, ...any[]]
  ? ParamName extends keyof Arg1
    ? Arg1[ParamName]
    : never
  : never;

/**
 * Extrae el tipo de un campo específico de la respuesta de un método de la API
 * @example ApiField<"usuarios", "findOne", "roles"> → UsuarioResultDtoRolesEnum[]
 * @example ApiField<"vehiculos", "findOne", "estado"> → VehiculoResultDtoEstadoEnum
 */
export type ApiField<
  Module extends keyof Api<unknown>,
  Method extends keyof Api<unknown>[Module],
  FieldName extends keyof ApiResponse<Module, Method>
> = ApiResponse<Module, Method>[FieldName];
