export class MapStyle {
  private constructor(private _style: string) {}

  public get style(): string {
    return this._style;
  }

  public new(style: string): MapStyle {
    return new MapStyle(style);
  }

  static STANDARD = new MapStyle('mapbox://styles/mapbox/standard');
  static STREETS_V12 = new MapStyle('mapbox://styles/mapbox/streets-v12');
}