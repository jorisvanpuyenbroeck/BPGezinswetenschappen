import { FormControl } from '@angular/forms';
import { Organisation } from "../models/organisation";
import { OrganisationService } from "../services/organisation.service";

export class CustomValidators {
    static organisationService: OrganisationService;
    static takenOrganisationNames: string[] = [];

    constructor(organisationService: OrganisationService) {
        CustomValidators.organisationService = organisationService;
        CustomValidators.updateTakenOrganisationNames();
    }

    static updateTakenOrganisationNames(): void {
        CustomValidators.organisationService.getOrganisations().subscribe((result: Organisation[]) => {
            CustomValidators.takenOrganisationNames = result.map(organisation => organisation.name);
            console.log(CustomValidators.takenOrganisationNames);
        });
    }

    static invalidOrganisationName(control: FormControl): {[s: string]: boolean} | null {
        if (CustomValidators.takenOrganisationNames.indexOf(control.value) !== -1) {
            return {'nameIsTaken': true};
        }
        return null;
    }
}
