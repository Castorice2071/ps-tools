/// <reference path="../../shared/global.d.ts" />

/**
 * TypeScript definitions for Premiere Pro's ExtendScript API would not have happened
 * without the efforts of Eric Robinson and Pravdomil Toman. If you find these definitions
 * useful, it's thanks to them. If you find problems with them, they're mine.
 *
 * -bbb
 * 4/15/19
 *
 */

/**
 * 0 = false,
 * 1 = true
 */

type NumericalBool = 0 | 1
type MediaType = "Video" | "Audio" | "any"
type SampleRateOption = 48000 | 96000
type BitsPerSampleOption = 16 | 24
type SDKEventType = "warning" | "info" | "error"

declare enum WorkAreaType {
  ENCODE_ENTIRE = 0,
  ENCODE_IN_TO_OUT = 1,
  ENCODE_WORK_AREA = 2,
}

declare enum TIME_FORMAT {
  TIMEDISPLAY_24Timecode = 100,
  TIMEDISPLAY_25Timecode = 101,
  TIMEDISPLAY_2997DropTimecode = 102,
  TIMEDISPLAY_2997NonDropTimecode = 103,
  TIMEDISPLAY_30Timecode = 104,
  TIMEDISPLAY_50Timecode = 105,
  TIMEDISPLAY_5994DropTimecode = 106,
  TIMEDISPLAY_5994NonDropTimecode = 107,
  TIMEDISPLAY_60Timecode = 108,
  TIMEDISPLAY_Frames = 109,
  TIMEDISPLAY_23976Timecode = 110,
  TIMEDISPLAY_16mmFeetFrames = 111,
  TIMEDISPLAY_35mmFeetFrames = 112,
  TIMEDISPLAY_48Timecode = 113,
  TIMEDISPLAY_AudioSamplesTimecode = 200,
  TIMEDISPLAY_AudioMsTimecode = 201,
}

interface $ {
  _PPP_: any
}

/**
 * Structure containing sequence settings.
 */
declare class SequenceSettings {
  audioChannelCount: number
  audioChannelType: number
  audioDisplayFormat: number
  audioSampleRate: Time
  compositeLinearColor: boolean
  editingMode: String
  maximumBitDepth: boolean
  maximumRenderQuality: boolean
  previewCode: String
  previewFileFormat: String
  previewFrameHeight: number
  previewFrameWidth: number
  videoDisplayFormat: number
  videoFieldType: number
  videoFrameRate: Time
  videoFrameHeight: number
  videoFrameWidth: number
  videoPixelAspectRatio: string
  vrHorzCapturedView: number
  vrLayout: number
  vrProjection: number
  vrVertCapturedView: number
  workingColorSpaceList: Array<any>
  workingColorSpace: String
}

/**
 * A sequence.
 */
declare class Sequence {
  /**
   * Subtitle (Default)
   */
  static readonly CAPTION_FORMAT_SUBTITLE: number

  /**
   * CEA-608
   */
  static readonly CAPTION_FORMAT_608: number

  /**
   * CEA-708
   */
  static readonly CAPTION_FORMAT_708: number

  /**
   * Teletext
   */
  static readonly CAPTION_FORMAT_TELETEXT: number

  /**
   * EBU Subtitle
   */
  static readonly CAPTION_FORMAT_OPEN_EBU: number

  /**
   * OP-42
   */
  static readonly CAPTION_FORMAT_OP42: number

  /**
   * OP-47
   */
  static readonly CAPTION_FORMAT_OP47: number

  /**
   *
   */
  sequenceSettings: SequenceSettings

  /**
   * A collection of the sequence's audio tracks.
   */
  readonly audioTracks: TrackCollection

  /**
   * Timecode (as a string) of the end of the sequence.
   */
  readonly end: string

  /**
   * Width
   */
  readonly frameSizeHorizontal: number

  /**
   * Height
   */
  readonly frameSizeVertical: number

  /**
   * Sequence ID
   */
  readonly id: number

  /**
   * The sequence's markers.
   */
  readonly markers: MarkerCollection

  /**
   * The available colorspaces
   */
  readonly workingColorSpaceList: Array<any>

  /**
   * The color space in use by the sequence
   */
  workingColorSpace: string

  /**
   * Name (writable).
   */
  name: string

  /**
   *
   */
  videoDisplayFormat: number

  /**
   * The `projectItem` corresponding to the sequence.
   */
  readonly projectItem: ProjectItem

  /**
   * Permanent ID of the sequence, within its project.
   */
  readonly sequenceID: string

  /**
   *
   */
  readonly timebase: string

  /**
   *
   */
  readonly videoTracks: TrackCollection

  /**
   * The starting timecode of the first frame of the sequence, as a string.
   */
  readonly zeroPoint: string

  /**
   * Adds a new metadata key to the sequence, and sets its value.
   * @param propertyID Name of new property
   * @param propertyValue Value of new property
   */
  attachCustomProperty(propertyID: string, propertyValue: string): void

  /**
   *
   */
  bind(eventName: string, function_: any): void

  /**
   * Clones a sequence.
   * @returns a boolean indicating whether the cloning was successful.
   */
  clone(): boolean

  /**
   * Creates a caption track in the active sequence using caption data from a project item.
   * @param projectItem A captions source clip (e.g. .srt)
   * @param startAtTime Offset in seconds from start of sequence
   * @param captionsFormat (Optional, defaults to subtitle) Caption format of the new track (see table below).
   */
  createCaptionTrack(projectItem: ProjectItem, startAtTime: number, captionFormat: number): Sequence

  /**
   * Creates a new sequence from the source sequence's in and out points.
   * @param ignoreMapping If True the current selection, not track targeting, will determine
   * the clips to include in the new sequence.
   *
   * If there is no selection, track targeting determines which clips are included in the new sequence.
   */
  createSubsequence(ignoreMapping: Boolean): Sequence

  /**
   * Exports a new FCP XML file representing this sequence.
   * @param exportPath The full file path (with file name) to create.
   * @param suppressUI Optional; quiets any warnings or errors encountered during export.
   */
  exportAsFinalCutProXML(exportPath: string, suppressUI?: number): boolean

  /**
   * Premiere Pro exports the sequence immediately.
   * @param outputFilePath The output file path (with name).
   * @param presetPath The .epr file to use.
   * @param workAreaType Optional work area specifier.
   */
  exportAsMediaDirect(
    outputFilePath: string,
    presetPath: string,
    workAreaType?: WorkAreaType,
  ): string

  /**
   * Exports the sequence (and its constituent media) as a new PPro project.
   * @param path Output file path, including file name.
   */
  exportAsProject(exportPath: string): void

  /**
   * Retrieves the file extension associated with a given output preset (.epr file).
   * @param presetFilePath full path to .epr file
   */
  getExportFileExtension(presetFilePath: string): string

  /**
   * Retrieves the sequence's in point, as a timecode string.
   */
  getInPoint(): string

  /**
   * Retrieves the sequence's out point, as a timecode string.
   */
  getOutPoint(): string

  /**
   * Retrieves the sequence's in point, as a `Time` object.
   */
  getInPointAsTime(): Time

  /**
   * Retrieves the sequence's out point, as a `Time` object.
   */
  getOutPointAsTime(): Time

  /**
   * Retrieves the current player position, as a `Time` object.
   */
  getPlayerPosition(): Time

  /**
   * Sets the in point of the sequence.
   * @param seconds Time of in point.
   */
  setInPoint(seconds: number): void

  /**
   * Sets the out point of the sequence.
   * @param seconds Time of out point.
   */
  setOutPoint(seconds: number): void

  /**
   * Sets the current player position.
   * @param pos The new position, as a string, representing ticks.
   */
  setPlayerPosition(pos: string): void

  /**
   *
   */
  setTimeout(eventName: string, function_: any, milliseconds: number): void

  /**
   * Sets the timecode of the first frame of the sequence.
   * @param newStartTime The new starting time, in `ticks`.
   */
  setZeroPoint(newStartTime: string): void

  /**
   * Links the currently-selected `trackItems` together, if possible.
   * @returns `True` if successful.
   */
  linkSelection(): boolean

  /**
   * Unlinks the currently-selected `trackItems`, if possible.
   * @returns `True` if successful.
   */
  unlinkSelection(): boolean

  /**
   * Imports a Motion Graphics Template (.mogrt) into the sequence
   * @param pathToMOGRT Complete path to .mogrt
   * @param timeInTicks Time (in ticks) at which to insert
   * @param videoTrackOffset The offset from first video track to targeted track
   * @param audioTrackOffset The offset from first audio track to targeted track
   * @returns newly-created `trackItem` representing the .mogrt
   */
  importMGT(
    pathToMOGRT: String,
    timeInTicks: String,
    videoTrackOffset: number,
    audioTrackOffset: number,
  ): TrackItem

  /**
   * Returns `true` if work area is enabled.
   */
  isWorkAreaEnabled(): Boolean

  /**
   * Sets the enabled state of the seqeuence work area.
   * @param enableState The desired state
   */
  setWorkAreaEnabled(enableState: Boolean): void

  /**
   * Returns the work area in point, in seconds.
   */
  getWorkAreaInPoint(): number

  /**
   * Specify the work area in point, in seconds.
   * @param timeInSeconds new in point time.
   */
  setWorkAreaInPoint(timeInSeconds: number): void

  /**
   * Returns the work area out point, in seconds.
   */
  getWorkAreaOutPoint(): number

  /**
   * Specify the work area out point, in seconds.
   * @param timeInSeconds new out point time.
   */
  setWorkAreaOutPoint(timeInSeconds: number): void

  /**
   * @returns the work area in point, as a `Time` object.
   */
  getWorkAreaInPointAsTime(): Time

  /**
   * Specify the work area in point, as `Time`.
   */
  setWorkAreaInPointAsTime(outPoint: Time): void

  /**
   * @returns the work area out point, as a `Time` object.
   */
  getWorkAreaOutPointAsTime(): Time

  /**
   * Specify the work area out point, as `Time`.
   */
  setWorkAreaOutPointAsTime(outPoint: Time): void

  /**
   * Inserts a clip (`trackItem`) into the sequence.
   * @param projectItem The project item to insert.
   * @param time Time at which to insert.
   * @param vidTrackOffset The offset from the first video track to targeted track
   * @param audTrackOffset The offset from the first audio track to targeted track
   */
  insertClip(
    projectItem: ProjectItem,
    time: Time,
    vidTrackOffset: number,
    audTrackOffset: number,
  ): TrackItem

  /**
   * @returns currently-selected clips, as an `Array` of `trackItems`
   */
  getSelection(): Array<TrackItem>

  /**
   * Returns the current sequence settings.
   * @returns SequenceSettings
   */
  getSettings(): SequenceSettings

  /**
   * Specifies the sequence settings to use.
   * @param newSettings New settings
   */
  setSettings(newSettings: SequenceSettings): void

  /**
   *  @returns true if effect analysis is complete
   */

  isDoneAnalyzingForVideoEffects(): Boolean

  /**
   *
   * @param numerator Numerator of desired frame aspect ratio
   * @param denominator Denominator of desired frame aspect ratio
   * @param motionPreset Either "default", "faster" or "slower"
   * @param sequenceName Name for created sequence
   * @param nest Use nested sequences?
   */

  autoReframeSequence(
    numerator: Number,
    denominator: Number,
    motionPreset: String,
    sequenceName: String,
    nest: Boolean,
  ): Sequence

  /**
   *
   * @param action Either 'ApplyCuts' or 'CreateMarkers'
   * @param applyCutsToLinkedAudio Operate on linked audio too?
   * @param sensitivity 'LowSensitivity', 'MediumSensitivity', or 'HighSensitivity'
   */
  performCutDetectionOnSelection(
    action: String,
    applyCutsToLinkedAudio: Boolean,
    sensitivity: String,
  ): void
  /**
   *
   */
  unbind(eventName: string): void
}

/**
 * Structure containing all available options for the `ProjectManager`.
 */
declare class ProjectManagerOptions {
  /**
   * Transfer mode setting: Copy source media
   */
  readonly CLIP_TRANSFER_COPY: string

  /**
   * Transfer mode setting: Transcode source media
   */
  readonly CLIP_TRANSFER_TRANSCODE: string

  /**
   * Transcode mode setting: Transcode source media to a specific preset
   */
  readonly CLIP_TRANSCODE_MATCH_PRESET: string

  /**
   * Transcode mode setting: Transcode source media to match clips
   */
  readonly CLIP_TRANSCODE_MATCH_CLIPS: string

  /**
   * Transcode mode setting: Transcode source media to match sequence settings
   */
  readonly CLIP_TRANSCODE_MATCH_SEQUENCE: string

  /**
   * Which transcode option to use; will be one of these:
   * 	`CLIP_TRANSCODE_MATCH_PRESET`
   *  `CLIP_TRANSCODE_MATCH_CLIPS`
   * 	`CLIP_TRANSCODE_MATCH_SEQUENCE`
   */
  clipTranscoderOption: string

  /**
   * Which transfer option to use; will be one of these:
   * 	`CLIP_TRANSFER_COPY`
   *  `CLIP_TRANSFER_TRANSCODE`
   */
  clipTransferOption: string

  /**
   * If `true`, projectItems not used in a sequence are not transferred
   */
  excludeUnused: boolean

  /**
   * The number of 'handle' frames to provide, before and after the in/out points of clips in the sequence.
   */
  handleFrameCount: number

  /**
   * If `true`, preview files will also be transferred.
   */
  includePreviews: boolean

  /**
   * If `true`, conformed audio files will also be transferred.
   */
  includeConformedAudio: boolean

  /**
   * If `true`, media files will be renamed to match clip names.
   */
  renameMedia: boolean

  /**
   * The containing directory for the consolidation/transfer.
   */
  destinationPath: String

  /**
   * If `true`, all sequences in the project will be transferred.
   */
  includeAllSequences: boolean

  /**
   * An `Array` of all sequences affected by the transfer.
   */
  affectedSequences: Array<Sequence>

  /**
   * Path the the encoder preset (.epr file) to be used.
   */
  encoderPresetFilePath: String

  /**
   * If `true`, image sequences will be transcoded.
   */
  convertImageSequencesToClips: boolean

  /**
   * If `true`, synthetic importer clips will be transcoded.
   */
  convertSyntheticsToClips: boolean

  /**
   * If `true`, After Effects compositions will be transcoded.
   */
  convertAECompsToClips: boolean

  /**
   * If `true`, source media will be copied not transcoded, if transcoding would have resulted in loss of alpha information.
   */
  copyToPreventAlphaLoss: boolean
}

declare class ProjectManager {
  /**
   * An array of strings describing errors encountered.
   */
  errors: Array<Error>

  /**
   * The `ProjectManagerOptions` structure.
   */
  options: ProjectManagerOptions

  /**
   * Perform the consolidation and transfer.
   * @param project the `Project` to consolidate.
   */
  process(project: Project): number

  /**
   *
   */
  unbind(eventName: string): void
}

/**
 *
 */
declare class SequenceCollection {
  /**
   *
   */
  readonly numSequences: number

  /**
   *
   */
  bind(eventName: string, function_: any): void

  /**
   *
   */
  setTimeout(eventName: string, function_: any, milliseconds: number): void

  /**
   *
   */
  unbind(eventName: string): void

  /**
   *
   */
  [index: number]: Sequence
}

/**
 *
 */
declare class Metadata {
  /**
   *
   */
  readonly getMetadata: string

  /**
   *
   */
  addMarker(): void

  /**
   *
   */
  bind(eventName: string, function_: any): void

  /**
   *
   */
  deleteMarker(): void

  /**
   *
   */
  setMarkerData(): void

  /**
   *
   */
  setMetadataValue(): void

  /**
   *
   */
  setTimeout(eventName: string, function_: any, milliseconds: number): void

  /**
   *
   */
  unbind(eventName: string): void

  /**
   *
   */
  updateMarker(): void
}

/**
 *
 */
declare class Anywhere {
  /**
   *
   */
  bind(eventName: string, function_: any): void

  /**
   *
   */
  getAuthenticationToken(): string

  /**
   *
   */
  getCurrentEditingSessionActiveSequenceURL(): string

  /**
   *
   */
  getCurrentEditingSessionSelectionURL(): string

  /**
   *
   */
  getCurrentEditingSessionURL(): string

  /**
   *
   */
  isProductionOpen(): boolean

  /**
   *
   */
  listProductions(): RemoteProductionCollection

  /**
   *
   */
  openProduction(inProductionURL: string): boolean

  /**
   *
   */
  setAuthenticationToken(inAuthToken: string, inEmail: string): boolean

  /**
   *
   */
  setTimeout(eventName: string, function_: any, milliseconds: number): void

  /**
   *
   */
  unbind(eventName: string): void
}

/**
 *
 */
declare class CsxsResourceCentral {
  /**
   *
   */
  bind(eventName: string, function_: any): void

  /**
   *
   */
  getBrightness(): string

  /**
   *
   */
  openURL(urlString: string): void

  /**
   *
   */
  setTimeout(eventName: string, function_: any, milliseconds: number): void

  /**
   *
   */
  unbind(eventName: string): void

  /**
   *
   */
  validateClient(token: string): boolean
}

/**
 *
 */
declare class SourceMonitor {
  /**
   *
   */
  bind(eventName: string, function_: any): void

  /**
   *
   */
  closeAllClips(): void

  /**
   *
   */
  closeClip(): void

  /**
   *
   */
  openFilePath(filePath: string): boolean

  /**
   *
   */
  play(speed?: number): void

  /**
   *
   */
  setTimeout(eventName: string, function_: any, milliseconds: number): void

  /**
   *
   */
  unbind(eventName: string): void

  /**
   *
   */
  getPosition(): Time

  /**
   *
   */
  openProjectItem(itemToOpen: ProjectItem): void

  /**
   *
   */
  getProjectItem(): ProjectItem
}

/**
 *
 */
declare class Time {
  /**
   *
   */
  seconds: number

  /**
   *
   */
  ticks: string

  /**
   *
   */
  bind(eventName: string, function_: any): void

  /**
   *
   */
  getFormatted(Time: Time, timeFormat: TIME_FORMAT): String

  /**
   *
   */
  setTimeout(eventName: string, function_: any, milliseconds: number): void

  /**
   *
   */
  unbind(eventName: string): void
}

/**
 *
 */
declare class ProjectItemType {
  /**
   *
   */
  static readonly BIN: number

  /**
   *
   */
  static readonly CLIP: number

  /**
   *
   */
  static readonly FILE: number

  /**
   *
   */
  static readonly ROOT: number

  /**
   *
   */
  bind(eventName: string, function_: any): void

  /**
   *
   */
  setTimeout(eventName: string, function_: any, milliseconds: number): void

  /**
   *
   */
  unbind(eventName: string): void
}

/**
 *
 */
declare class Project {
  /**
   *f
   */
  activeSequence: Sequence

  /**
   *
   */
  readonly documentID: string

  /**
   *
   */
  readonly name: string

  /**
   * Warning: in MacOS Ventura, fetching the project path can throw an error during shutdown
   * Bug ID:  DVAPR-4242199
   *
   * Workaround: put any path checks in a try/catch block if checking may coincide with shutdown
   */
  readonly path: string

  /**
   *
   */
  readonly rootItem: ProjectItem

  /**
   *
   */
  readonly sequences: SequenceCollection

  /**
   *
   */
  addPropertyToProjectMetadataSchema(name: string, label: string, type: number): boolean

  /**
   *
   */
  bind(eventName: string, function_: any): void

  /**
   *
   */
  closeDocument(): boolean

  /**
   *
   */
  createNewSequence(sequenceName: string, placeholderID: string): Sequence

  /**
   *
   */
  deleteAsset(): void

  /**
   *
   */
  deleteSequence(sequence: Sequence): boolean

  /**
   *
   */
  exportAAF(
    sequence: Sequence,
    filePath: string,
    mixDownVideo: number,
    explodeToMono: number,
    sampleRate: number,
    bitsPerSample: number,
    embedAudio: number,
    audioFileFormat: number,
    trimSources: number,
    handleFrames: number,
  ): number

  /**
   *
   */
  exportFinalCutProXML(exportPath: string, suppressUI: number): boolean

  /**
   *
   */
  consolidateDuplicates(): void

  /**
   *
   */
  exportOMF(
    sequence: Sequence,
    filePath: string,
    OMFTitle: string,
    sampleRate: number,
    bitsPerSample: number,
    audioEncapsulated: number,
    audioFileFormat: number,
    trimAudioFiles: number,
    handleFrames: number,
    includePan: number,
  ): number

  /**
   *
   */
  exportTimeline(exportControllerName: string): number

  /**
   *
   */
  getInsertionBin(): ProjectItem

  /**
   *
   */
  getProjectPanelMetadata(): string

  /**
   *
   */
  importAEComps(aepPath: String, compsToImport: Array<any>, projectBin: ProjectItem): boolean

  /**
   *
   */
  importAllAEComps(arg1: any, compsToImport: Array<any>, projectBin: ProjectItem): boolean

  /**
   * Imports files into the project.
   * @param arrayOfFilePathsToImport An array of paths to files to import
   * @param suppressUI optional; if true, suppress any warnings, translation reports, or errors.
   * @param projectBin optional; if present, the bin into which to import the new media.
   * @param importAsNumberedStill optiona; if present, interprets the file paths as a series of numbered stills.
   */
  importFiles(
    arrayOfFilePathsToImport: string[],
    suppressUI?: boolean,
    projectBin?: ProjectItem,
    importAsNumberedStill?: boolean,
  ): boolean

  /**
   * Imports sequences from a project.
   * @param projectPath Path to project from which to import sequences.
   * @param sequences An array of sequence IDs to import, from the project.
   */
  importSequences(projectPath: String, sequencesToImport: Array<string>): boolean

  /**
   *
   */
  openSequence(sequenceID: string): boolean

  /**
   *
   */
  pauseGrowing(pausedOrNot: number): boolean

  /**
   *
   */
  placeAsset(arg1: any): boolean

  /**
   *
   */
  save(): void

  /**
   *
   */
  saveAs(saveAsPath: string): boolean

  /**
   *
   */
  setProjectPanelMetadata(newMetadata: string): void

  /**
   *
   * @param newSequenceName 	Name for newly-created sequence
   * @param projectItems 		Array of project items to be added to sequence
   * @param targetBin 		Bin in which new sequence should be created
   */

  createNewSequenceFromClips(
    newSequenceName: string,
    projectItems: Array<ProjectItem>,
    targetBin: ProjectItem,
  ): Sequence

  /**
   *
   */
  getSupportedGraphicsWhiteLuminances(): Array<any>

  /**
   *
   */
  getGraphicsWhiteLuminance(): number

  /**
   *
   * @param newGWL
   */
  setGraphicsWhiteLuminance(newGWL: number): boolean

  /**
   *
   */
  setTimeout(eventName: string, function_: any, milliseconds: number): void

  /**
   *
   */
  unbind(eventName: string): void
}

/**
 *
 */
declare class Track {
  /**
   *
   */
  name: String

  /**
   *
   */
  readonly clips: TrackItemCollection

  /**
   *
   */
  readonly id: number

  /**
   *
   */
  readonly mediaType: string

  /**
   *
   */
  readonly transitions: TrackItemCollection

  /**
   *
   */
  bind(eventName: string, function_: any): void

  /**
   * Inserts a clip relative to the time of the last item on that track
   */
  insertClip(clipProjectItem: ProjectItem, time: number): boolean

  /**
   *
   */
  isMuted(): boolean

  /**
   *
   */
  isLocked(): boolean

  /**
   * Overwrites a clip at an absolute time on a track
   */
  overwriteClip(clipProjectItem: ProjectItem, time: number | Time): boolean

  /**
   *
   */
  setMute(arg1?: number): void

  /**
   *
   */
  setLocked(arg1?: number): void

  /**
   *
   */
  setTimeout(eventName: string, function_: any, milliseconds: number): void

  /**
   *
   */
  isTargeted(): boolean

  /**
   *
   */
  setTargeted(isTargeted: boolean, shouldBroadcast: boolean): boolean

  /**
   *
   */
  unbind(eventName: string): void
}

/**
 *
 */

declare class ComponentCollection {
  /**Number of items
   *
   */
  readonly numItems: number
  /**Number of items
   *
   */
  readonly length: number;

  /**
   *
   */
  [index: number]: Component
}
declare class Component {
  /**
   *
   */
  readonly displayName: string
  /**
   *
   */
  readonly matchName: string
  /**
   *
   */
  readonly properties: ComponentParamCollection
}
declare class TrackItem {
  /**
   *
   */
  readonly components: any

  /**
   *
   */
  readonly duration: Time

  /**
   *
   */
  readonly nodeId: string

  /**
   *
   */
  end: Time

  /**
   *
   */
  inPoint: Time

  /**
   *
   */
  outPoint: Time

  /**
   *
   */
  readonly mediaType: string

  /**
   *
   */
  name: string

  /**
   * @version 22.0
   */
  disabled: boolean

  /**
   *
   */
  projectItem: ProjectItem

  /**
   *
   */
  readonly start: Time

  /**
   *
   */
  readonly type: number

  /**
   *
   */
  bind(eventName: string, function_: any): void

  /**
   *
   */
  getLinkedItems(): TrackItemCollection

  /**
   *
   */
  isSelected(): boolean

  /**
   *
   */
  isSpeedReversed(): 0 | 1

  /**
   *
   */
  setSelected(isSelected: boolean, updateUI?: boolean): void

  /**
   *
   */
  isAdjustmentLayer(): boolean

  /**
   *
   */
  remove(rippleEdit: boolean, alignToVideo: boolean): boolean

  /**
   *
   */
  getSpeed(): number

  /**
   *
   */
  getMGTComponent(): Component

  /**
   *
   */
  getColorSpace(): String

  /**
   *
   */
  move(seconds: number): boolean

  /**
   *
   */
  setTimeout(eventName: string, function_: any, milliseconds: number): void

  /**
   *
   */
  unbind(eventName: string): void
}

/**
 *
 */
declare class ProjectItem {
  /**
   *
   */
  readonly children: ProjectItemCollection

  /**
   *
   */
  name: string

  /**
   *
   */
  readonly nodeId: string

  /**
   *
   */
  readonly treePath: string

  /**
   *
   */
  readonly type: number

  /**
   *
   */
  timeDisplayFormat: number

  /**
   *
   */
  videoComponents: () => ComponentCollection | undefined

  /**
   *
   */
  attachProxy(mediaPath: string, isHiRes: number): boolean

  /**
   *
   */
  detachProxy(): boolean

  /**
   *
   */
  bind(eventName: string, function_: any): void

  /**
   *
   */
  canChangeMediaPath(): boolean

  /**
   *
   */
  canProxy(): boolean

  /**
   *
   */
  changeMediaPath(mediaPath: string, suppressWarnings: boolean): boolean

  /**
   *
   */
  createBin(name: string): ProjectItem

  /**
   *
   */
  createSmartBin(name: string, query: string): void

  /**
      * 	Returns whether the projectItem represents a sequence.
        @returns true, if projectItem is a sequence.
     */
  isSequence(): boolean

  /**
   *
   */
  createSubClip(
    name: string,
    startTime: object,
    endTime: object,
    hasHardBoundaries: number,
    takeVideo?: number,
    takeAudio?: number,
  ): ProjectItem

  /**
   *
   */
  deleteBin(): void

  /**
   *
   */
  findItemsMatchingMediaPath(matchString: string, ignoreSubclips?: number): void

  /**
   *
   */
  getColorLabel(): number

  /**
   *
   */
  getMarkers(): MarkerCollection

  /**
   *
   */
  getMediaPath(): string

  /**
   *
   */
  getProjectMetadata(): string

  /**
   *
   */
  getProxyPath(): string

  /**
   *
   */
  getXMPMetadata(): string

  /**
   *
   */
  hasProxy(): boolean

  /**
   *
   */
  moveBin(destination: ProjectItem): void

  /**
   *
   */
  refreshMedia(): string

  /**
   *
   */
  renameBin(name: string): boolean

  /**
   *
   */
  select(): void

  /**
   *
   */
  setColorLabel(newColor: number): void

  /**
   *
   */
  setOverridePixelAspectRatio(numerator: number, denominator: number): boolean

  /**
   *
   */
  setOverrideFrameRate(newFrameRate: number): boolean

  /**
   *
   */
  setProjectMetadata(buffer: String, keysToBeUpdated: Array<any>): void

  /**
   *
   */
  setScaleToFrameSize(): void

  /**
   *
   */
  setStartTime(arg1: object): void

  /**
   * Sets the in point of the clip.
   * @param seconds Time of in point.
   */
  setInPoint(seconds: Time | number | string, p2: number): void

  /**
   * Sets the out point of the clip.
   * @param seconds Time of out point.
   */
  setOutPoint(seconds: Time | number | string, p2: number): void

  /**
   *
   */
  setTimeout(eventName: string, function_: any, milliseconds: number): void

  /**
   *
   */
  setXMPMetadata(buffer: String): boolean

  /**
   *
   */
  startTime(): Time

  /**
   *
   * @param newColorSpace value must be available via sequence.workingColorSpaceList
   */
  setOverrideColorSpace(newColorSpace: String): void

  /**
   *
   */
  getColorSpace(): String

  /**
   *
   */
  isMultiCamClip(): boolean

  /**
   *
   */
  isMergedClip(): boolean

  /**
   *
   */
  getInPoint(): Time

  /**
   *
   */
  getOutPoint(): Time

  /**
   *
   */
  unbind(eventName: string): void
}

/**
 *
 */
declare class ProjectCollection {
  /**
   *
   */
  readonly numProjects: number

  /**
   *
   */
  bind(eventName: string, function_: any): void

  /**
   *
   */
  setTimeout(eventName: string, function_: any, milliseconds: number): void

  /**
   *
   */
  unbind(eventName: string): void

  /**
   *
   */
  [index: number]: Project
}

/**
 *
 */
declare class ProjectItemCollection {
  /**
   *
   */
  readonly numItems: number

  /**
   *
   */
  bind(eventName: string, function_: any): void

  /**
   *
   */
  setTimeout(eventName: string, function_: any, milliseconds: number): void

  /**
   *
   */
  unbind(eventName: string): void

  /**
   *
   */
  [index: number]: ProjectItem
}

/**
 *
 */
declare class TrackCollection {
  /**
   *
   */
  readonly numTracks: number

  /**
   *
   */
  bind(eventName: string, function_: any): void

  /**
   *
   */
  setTimeout(eventName: string, function_: any, milliseconds: number): void

  /**
   *
   */
  unbind(eventName: string): void

  /**
   *
   */
  [index: number]: Track
}

/**
 *
 */
declare class TrackItemCollection {
  /**Number of items
   *
   */
  readonly numItems: number

  /**
   *
   */
  bind(eventName: string, function_: any): void

  /**
   *
   */
  setTimeout(eventName: string, function_: any, milliseconds: number): void

  /**
   *
   */
  unbind(eventName: string): void

  /**
   *
   */
  [index: number]: TrackItem
}

/**
 *
 */
declare class ScratchDiskType {
  /**
   *
   */
  static readonly FirstAudioCaptureFolder: string

  /**
   *
   */
  static readonly FirstAudioPreviewFolder: string

  /**
   *
   */
  static readonly FirstAutoSaveFolder: string

  /**
   *
   */
  static readonly FirstCClibrariesFolder: string

  /**
   *
   */
  static readonly FirstCapsuleMediaFolder: string

  /**
   *
   */
  static readonly FirstVideoCaptureFolder: string

  /**
   *
   */
  static readonly FirstVideoPreviewFolder: string

  /**
   *
   */
  bind(eventName: string, function_: any): void

  /**
   *
   */
  setTimeout(eventName: string, function_: any, milliseconds: number): void

  /**
   *
   */
  unbind(eventName: string): void
}

/**
 *
 */
declare class Csxs {
  /**
   *
   */
  readonly resourceCentral: CsxsResourceCentral

  /**
   *
   */
  bind(eventName: string, function_: any): void

  /**
   *
   */
  setTimeout(eventName: string, function_: any, milliseconds: number): void

  /**
   *
   */
  unbind(eventName: string): void
}

/**
 *
 */
declare class RemoteProductionCollection {
  /**
   *
   */
  readonly numProductions: number

  /**
   *
   */
  bind(eventName: string, function_: any): void

  /**
   *
   */
  setTimeout(eventName: string, function_: any, milliseconds: number): void

  /**
   *
   */
  unbind(eventName: string): void
}

/**
 *
 */
declare class RemoteProduction {
  /**
   *
   */
  readonly description: string

  /**
   *
   */
  readonly name: string

  /**
   *
   */
  readonly url: string

  /**
   *
   */
  bind(eventName: string, function_: any): void

  /**
   *
   */
  setTimeout(eventName: string, function_: any, milliseconds: number): void

  /**
   *
   */
  unbind(eventName: string): void
}

type EncoderEvent =
  | "onEncoderJobCanceled"
  | "onEncoderJobQueued"
  | "onEncoderJobComplete"
  | "onEncoderJobError"
  | "onEncoderJobProgress"
  | "onEncoderLaunched"

/**
 *
 */
declare class Encoder {
  /**
   *
   */
  readonly ENCODE_ENTIRE: number

  /**
   *
   */
  readonly ENCODE_IN_TO_OUT: number

  /**
   *
   */
  readonly ENCODE_WORKAREA: number

  /**
   *
   */
  bind(eventName: EncoderEvent, function_: any): void

  /**
   *
   */
  encodeFile(
    inputFilePath: string,
    outputFilePath: string,
    presetPath: string,
    removeOnCompletion?: number,
    startTime?: object,
    stopTime?: object,
  ): string

  /**
   *
   */
  encodeProjectItem(
    projectItem: ProjectItem,
    outputFilePath: string,
    presetPath: string,
    WorkAreaType?: number,
    removeOnCompletion?: number,
  ): string

  /**
   *
   */
  encodeSequence(
    sequence: Sequence,
    outputFilePath: string,
    presetPath: string,
    WorkAreaType?: number,
    removeOnCompletion?: number,
  ): string

  /**
   *
   */
  getExporters(): Array<any>
  /**
   *
   */
  launchEncoder(): boolean

  /**
   *
   */
  setEmbeddedXMPEnabled(enable: number): void

  /**
   *
   */
  setSidecarXMPEnabled(enable: number): void

  /**
   *
   */
  setTimeout(eventName: string, function_: any, milliseconds: number): void

  /**
   *
   */
  startBatch(): boolean

  /**
   *
   */
  lastExportMediaFolder(): String

  /**
   *
   */
  unbind(eventName: string): void
}

/**
 *
 */
declare class ComponentParamCollection {
  /** Number of items */
  readonly numItems: number

  /** Number of items */
  readonly length: number

  bind(eventName: string, function_: any): void
  clearProperty(propertyKey: string): void
  doesPropertyExist(propertyKey: string): boolean
  getProperty(propertyKey: string): any
  isPropertyReadOnly(propertyKey: string): boolean
  setProperty(
    propertyKey: string,
    propertyValue: any,
    permanenceValue: number,
    allowCreateNewProperty: boolean,
  ): void

  setTimeout(eventName: string, function_: any, milliseconds: number): void
  unbind(eventName: string): void
  [index: number]: ComponentParam
  getParamForDisplayName(paramName: string): ComponentParam | null
}

declare class ComponentParam {
  readonly displayName: string
  addKey(): boolean
  areKeyframesSupported(): boolean
  findNearestKey(): object
  findNextKey(): object
  findPreviousKey(): object
  getColorValue(): any[]
  getKeys(): any[]
  getValue(): any
  getValueAtKey(time: Time): any
  getValueAtTime(): any
  isEmpty(): boolean
  isTimeVarying(): boolean
  keyExistsAtTime(): boolean
  removeKey(): boolean
  removeKeyRange(start: Time, end: Time): boolean
  setColorValue(p0: number, p1: number, p2: number, p3: number, p4: boolean): boolean
  setInterpolationTypeAtKey(): boolean
  setTimeVarying(setTimeVarying: boolean, p1?: boolean): boolean
  setValue(value: any, updateUI?: boolean | number): boolean
  setValueAtKey(time: Time, value: any, updateUI?: boolean | number): boolean
}
/**
 *
 */
declare class PrProduction {
  /**
   *
   */
  name: string

  /**
   *
   */
  projects: ProjectCollection

  /**
   *
   */
  close(): void

  /**
   *
   */
  getLocked(project: Project): Boolean

  /**
   *
   */
  setLocked(project: Project, newLockState: Boolean): void

  /**
   *
   */
  moveToTrash(projectPath: String, suppressUI: Boolean, saveProject: Boolean): Boolean
}

type ApplicationEvent =
  | "onSourceClipSelectedInProjectPanel"
  | "onSequenceActivated"
  | "onActiveSequenceChanged"
  | "onActiveSequenceSelectionChanged"
  | "onActiveSequenceTrackItemAdded"
  | "onActiveSequenceTrackItemRemoved"
  | "onActiveSequenceStructureChanged"
  | "onProjectChanged"
  | "onProjectEndDrop"

/**
 *
 */
declare class Application {
  /**
   *
   */
  readonly anywhere: Anywhere

  /**
   *
   */
  readonly build: string

  /**
   *
   */
  readonly csxs: Csxs

  /**
   *
   */
  readonly encoder: Encoder

  /**
   *
   */
  readonly projectManager: ProjectManager

  /**
   *
   */
  readonly getAppPrefPath: string

  /**
   *
   */
  readonly getAppSystemPrefPath: string

  /**
   *
   */
  readonly getPProPrefPath: string

  /**
   *
   */
  readonly getPProSystemPrefPath: string

  /**
   *
   */
  readonly metadata: Metadata

  /**
   * This is the current active project.
   */
  project: Project

  /**
   *
   */
  readonly projects: ProjectCollection

  /**
   *
   */
  readonly properties: ComponentParamCollection

  /**
   *
   */
  readonly sourceMonitor: SourceMonitor

  /**
   *
   */
  readonly userGuid: string

  /**
   *
   */
  readonly version: string

  /**
   *
   */
  bind(eventName: ApplicationEvent, function_: Function): void

  /**
   *
   */
  broadcastPrefsChanged(preferencesThatChanged: string): boolean

  /**
   *
   */
  getEnableProxies(): number

  /**
   * Checks whether file specified is a doc
   * @param filePath This is the path to be checked
   * @returns true if the document at that path is openable as a PPro project
   */
  isDocument(filePath: string): boolean

  /**
   *
   */
  isDocumentOpen(): boolean

  /**
   *
   */
  openDocument(
    filePath: string,
    bypassConversionDialog?: boolean,
    bypassLocateFile?: boolean,
    bypassWarningDialog?: boolean,
    hideFromMRUList?: boolean,
  ): boolean

  /**
   * @param newValueForTranscodeOnIngest
   * @returns the newly-set state for whether or not PPro transcodes files upon ingest.
   */
  setEnableTranscodeOnIngest(newValueForTranscodeOnIngest: boolean): void

  /**
   *
   */
  openFCPXML(): boolean

  /**
   *
   */
  quit(): void

  /**
   *
   */
  setEnableProxies(enable: number): boolean

  /**
   *
   */
  setExtensionPersistent(extensionID: string, state?: number): void

  /**
   *
   */
  setSDKEventMessage(value: string, eventType: string): boolean

  /**
   *
   */
  setScratchDiskPath(value: string, type: string): boolean

  /**
   *
   */
  setTimeout(eventName: string, function_: any, milliseconds: number): void

  /**
   *
   */
  getProjectViewIDs(): Array<string>

  /**
   *
   */
  getProjectFromViewID(viewID: String): Project

  /**
   *
   */
  showCursor(enable: boolean): void

  /**
   *
   */
  getProjectViewSelection(viewID: String): Array<ProjectItem>

  /**
   *
   */
  setProjectViewSelection(projectItems: Array<ProjectItem>, viewID: String): void

  /**
   *
   */
  onItemAddedToProjectSuccess: undefined

  /**
   * @returns an array of the names of all available workspaces.
   */
  getWorkspaces(): Array<string>

  /**
   * @param workspaceName Name of workspace to use
   * @returns true if successful
   */
  setWorkspace(workspaceName: string): void

  /**
   *
   * @param eventName event to which to subscribe
   * @param function_ function to be called
   */
  addEventListener(eventName: string, function_: any): void

  /**
   *
   */
  trace(message: string): void

  /**
   *
   */
  unbind(eventName: string): void

  /**
   *
   */
  enableQE(): void

  /**
   *
   */
  newProject(projectName: string): boolean

  /**
   *
   */
  production: PrProduction

  /**
   *
   */
  openPrProduction(path: string): PrProduction
}

/**
 *
 */
declare class MarkerCollection {
  /**
   *
   */
  readonly numMarkers: number

  /**
   *
   */
  bind(eventName: string, function_: any): void

  /**
   *
   */
  createMarker(start: number, name: string, duration: number, comments: string): Marker

  /**
   *
   */
  deleteMarker(marker: Marker): void

  /**
   *
   */
  getFirstMarker(): Marker

  /**
   *
   */
  getLastMarker(): Marker

  /**
   *
   */
  getNextMarker(marker: Marker): Marker

  /**
   *
   */
  getPrevMarker(marker: Marker): Marker

  /**
   *
   */
  setTimeout(eventName: string, function_: any, milliseconds: number): void

  /**
   *
   */
  unbind(eventName: string): void

  /**
   *
   */
  [index: number]: Marker
}

/**
 *
 */
declare class Marker {
  /**
   *
   */
  comments: string

  /**
   *
   */
  end: Time

  /**
   *
   */
  readonly guid: string

  /**
   *
   */
  name: string

  /**
   *
   */
  start: Time

  /**
   *
   */
  type: string

  /**
   *
   */
  bind(eventName: string, function_: any): void

  /**
   *
   */
  getWebLinkFrameTarget(): string

  /**
   *
   */
  getWebLinkURL(): string

  /**
   *
   */
  setTimeout(eventName: string, function_: any, milliseconds: number): void

  /**
   *
   */
  setTypeAsChapter(): void

  /**
   *
   */
  setTypeAsComment(): void

  /**
   *
   */
  setTypeAsSegmentation(): void

  /**
   *
   */
  setTypeAsWebLink(url: string, frameTarget: string): void

  /**
   *
   */
  getColorByIndex(): number

  /**
   *
   */
  setColorByIndex(index: number): void

  /**
   *
   */
  unbind(eventName: string): void
}

/**
 *
 */
declare class Document {
  /**
   *
   */
  bind(eventName: string, function_: any): void

  /**
   *
   */
  getFilePath(): string

  /**
   *
   */
  importFiles(arg1: any): boolean

  /**
   *
   */
  setTimeout(eventName: string, function_: any, milliseconds: number): void

  /**
   *
   */
  unbind(eventName: string): void
}

declare const document: Document

interface SystemCompatibilityReport {
  /**
   * @param fullOutputPath The path and filename at which to write the report.
   */
  CreateReport(fullOutputPath: string): void
}

declare const SystemCompatibilityReport: SystemCompatibilityReport
