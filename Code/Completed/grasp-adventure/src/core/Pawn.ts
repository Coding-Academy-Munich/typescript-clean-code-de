import { Location } from "./Location";

export class Pawn {
  private readonly _name: string;
  private _location: Location;

  constructor(_name: string, location: Location) {
    this._name = _name;
    this._location = location;
  }

  get name(): string {
    return this._name;
  }

  get location(): Location {
    return this._location;
  }

  moveToLocation(location: Location): void {
    this._location = location;
  }
}
