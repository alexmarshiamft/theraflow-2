import { NextResponse } from 'next/server';

/**
 * FHIR R4 Patient/$everything Operation
 * https://www.hl7.org/fhir/operation-patient-everything.html
 * 
 * This endpoint mocks the extraction of a comprehensive electronic health record
 * for a specific client into the standardized FHIR R4 Bundle format,
 * which is a requirement for VA/TriWest interoperability and the 21st Century Cures Act.
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ clientId: string }> }
) {
  const { clientId } = await params;

  // In a real application, we would query our database (via Prisma)
  // to gather the Client, ClinicalNotes, Claims, etc.
  // For this mock, we generate a static but compliant FHIR R4 structure.

  const fhirBundle = {
    resourceType: 'Bundle',
    id: `bundle-transaction-${Date.now()}`,
    type: 'searchset',
    timestamp: new Date().toISOString(),
    entry: [
      {
        fullUrl: `urn:uuid:patient-${clientId}`,
        resource: {
          resourceType: 'Patient',
          id: clientId,
          identifier: [
            {
              system: 'http://theraflow.com/identifiers/client',
              value: clientId
            }
          ],
          active: true,
          name: [
            {
              use: 'official',
              family: 'Doe',
              given: ['John']
            }
          ],
          telecom: [
            {
              system: 'phone',
              value: '555-555-5555',
              use: 'mobile'
            }
          ],
          gender: 'male',
          birthDate: '1980-01-01'
        }
      },
      {
        fullUrl: `urn:uuid:condition-1`,
        resource: {
          resourceType: 'Condition',
          id: 'condition-1',
          clinicalStatus: {
            coding: [
              {
                system: 'http://terminology.hl7.org/CodeSystem/condition-clinical',
                code: 'active'
              }
            ]
          },
          code: {
            coding: [
              {
                system: 'http://hl7.org/fhir/sid/icd-10-cm',
                code: 'F43.22',
                display: 'Adjustment disorder with anxiety'
              }
            ],
            text: 'Adjustment disorder with anxiety'
          },
          subject: {
            reference: `Patient/${clientId}`
          }
        }
      },
      {
        fullUrl: `urn:uuid:encounter-1`,
        resource: {
          resourceType: 'Encounter',
          id: 'encounter-1',
          status: 'finished',
          class: {
            system: 'http://terminology.hl7.org/CodeSystem/v3-ActCode',
            code: 'AMB',
            display: 'ambulatory'
          },
          type: [
            {
              coding: [
                {
                  system: 'http://www.ama-assn.org/go/cpt',
                  code: '90837',
                  display: 'Psychotherapy, 60 minutes'
                }
              ]
            }
          ],
          subject: {
            reference: `Patient/${clientId}`
          },
          period: {
            start: new Date(Date.now() - 86400000 * 2).toISOString(),
            end: new Date(Date.now() - 86400000 * 2 + 3600000).toISOString()
          }
        }
      }
    ]
  };

  return NextResponse.json(fhirBundle, {
    status: 200,
    headers: {
      'Content-Type': 'application/fhir+json',
      // CORS headers might be needed if external systems hit this directly
      'Access-Control-Allow-Origin': '*'
    }
  });
}
