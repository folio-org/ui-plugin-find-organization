# Change history for ui-plugin-find-organization

## (5.2.0 IN PROGRESS)

* Add additional filters to support reporting requirements. Refs UIPFO-51.

## [5.1.0](https://github.com/folio-org/ui-plugin-find-organization/tree/v5.1.0) (2024-03-18)
[Full Changelog](https://github.com/folio-org/ui-plugin-find-organization/compare/v5.0.0...v5.1.0)

* Add the "Is Donor" filter selectable options for filters pane. Refs UIPFO-44.
* Configure organizations modal to display donor organizations and their `name` and `code` fields only. Refs UIPFO-46.
* Search organization on bank account number. Refs UIPFO-47.

## [5.0.0](https://github.com/folio-org/ui-plugin-find-organization/tree/v5.0.0) (2023-10-12)
[Full Changelog](https://github.com/folio-org/ui-plugin-find-organization/compare/v4.0.0...v5.0.0)

* Consistency of organizations filters with `ui-organizations`. Refs UIPFO-37.
* Upgrade `Node.js` to `18` version in GitHub Actions. Refs UIPFO-41.
* *BREAKING*: Upgrade `React` to `18` version. Refs UIPFO-40.
* *BREAKING*: bump `react-intl` to `v6.4.4`. Refs UIPFO-42.

## [4.0.0](https://github.com/folio-org/ui-plugin-find-organization/tree/v4.0.0) (2023-02-17)
[Full Changelog](https://github.com/folio-org/ui-plugin-find-organization/compare/v3.3.0...v4.0.0)

* *BREAKING*: Update `@folio/stripes` to `8.0.0`. Refs UIPFO-36.

## [3.3.0](https://github.com/folio-org/ui-plugin-find-organization/tree/v3.3.0) (2022-10-21)
[Full Changelog](https://github.com/folio-org/ui-plugin-find-organization/compare/v3.2.0...v3.3.0)

* Select an Organization - Implement MCL Next/Previous pagination. Refs UIPFO-33.
* Use defined constant as value of limit param in unit tests. Refs UIPFO-35.

## [3.2.0](https://github.com/folio-org/ui-plugin-find-organization/tree/v3.2.0) (2022-07-07)
[Full Changelog](https://github.com/folio-org/ui-plugin-find-organization/compare/v3.1.0...v3.2.0)

* Select filter should announce the number of Results in the Results List pane header. Refs UIPFO-27.
* Replace `babel-eslint` with `@babel/eslint-parser`. Refs UIPFO-28.

## [3.1.0](https://github.com/folio-org/ui-plugin-find-organization/tree/v3.1.0) (2022-03-01)
[Full Changelog](https://github.com/folio-org/ui-plugin-find-organization/compare/v3.0.0...v3.1.0)

## [3.0.0](https://github.com/folio-org/ui-plugin-find-organization/tree/v3.0.0) (2021-10-06)
[Full Changelog](https://github.com/folio-org/ui-plugin-find-organization/compare/v2.4.1...v3.0.0)

* increment stripes to v7. Refs UIPFO-21.

## [2.4.1](https://github.com/folio-org/ui-plugin-find-organization/tree/v2.4.1) (2021-06-16)
[Full Changelog](https://github.com/folio-org/ui-plugin-find-organization/compare/v2.4.0...v2.4.1)

* bump stripes-acq-components

## [2.4.0](https://github.com/folio-org/ui-plugin-find-organization/tree/v2.4.0) (2021-06-16)
[Full Changelog](https://github.com/folio-org/ui-plugin-find-organization/compare/v2.3.0...v2.4.0)

* Compile Translation Files into AST Format. Refs UIPFO-20.

## [2.3.0](https://github.com/folio-org/ui-plugin-find-organization/tree/v2.3.0) (2021-03-15)
[Full Changelog](https://github.com/folio-org/ui-plugin-find-organization/compare/v2.2.0...v2.3.0)

* upgrade stripes v6.
* UI tests replacement with RTL/Jest. Refs FAT-42.
* Add personal data disclosure form. Refs UIPFO-16.

## [2.2.0](https://github.com/folio-org/ui-plugin-find-organization/tree/v2.2.0) (2020-10-09)
[Full Changelog](https://github.com/folio-org/ui-plugin-find-organization/compare/v2.1.0...v2.2.0)

### Stories
* upgrade to stripes v5
* [UISACQCOMP-3](https://issues.folio.org/browse/UISACQCOMP-3) Handle import of stripes-acq-components to modules and platform

## [2.1.0](https://github.com/folio-org/ui-plugin-find-organization/tree/v2.1.0) (2020-06-11)
[Full Changelog](https://github.com/folio-org/ui-plugin-find-organization/compare/v2.0.0...v2.1.0)

### Stories
* [UIPFO-10](https://issues.folio.org/browse/UIPFO-10) Update to Stripes v4
* [UIORGS-178](https://issues.folio.org/browse/UIORGS-178) Redirect API calls from mod-organizations-storage to mod-organizations

### Bug fixes
* [UIPFO-10](https://issues.folio.org/browse/UIPFO-10) ui-plugin-find-organization: Update to Stripes v4
* [UIORGS-151](https://issues.folio.org/browse/UIORGS-151) Organizations is not using the same Expand/Collapse as implemented in Q4 2019

## [2.0.0](https://github.com/folio-org/ui-plugin-find-organization/tree/v2.0.0) (2020-03-13)
[Full Changelog](https://github.com/folio-org/ui-plugin-find-organization/compare/v1.5.0...v2.0.0)

* bump the @folio/stripes peer to v3.0.0

### Stories
* [FOLIO-2436](https://issues.folio.org/browse/FOLIO-2436) organizations-storage.organizations version
* [UIORGS-130](https://issues.folio.org/browse/UIORGS-130) remove dependency on ui-organizations, don't use SearchAndQuery.
* [UIPFO-6](https://issues.folio.org/browse/UIPFO-6) Return focus after lookup modal is closed without selection

### Bug Fixes
* [UIPFO-7](https://issues.folio.org/browse/UIPFO-7) Security update eslint to >= 6.2.1 or eslint-util >= 1.4.1

## [1.5.0](https://github.com/folio-org/ui-plugin-find-organization/tree/v1.5.0) (2019-12-04)
[Full Changelog](https://github.com/folio-org/ui-plugin-find-organization/compare/v1.4.0...v1.5.0)

* fetch new translations
* [UIPFO-3](https://issues.folio.org/browse/UIPFO-3) Update plugin header

## [1.4.0](https://github.com/folio-org/ui-plugin-find-organization/tree/v1.4.0) (2019-09-11)
[Full Changelog](https://github.com/folio-org/ui-plugin-find-organization/compare/v1.3.0...v1.4.0)

* fetch new translations
* [UIOR-305](https://issues.folio.org/browse/UIOR-305) Scrolling bug in the PO Vendor lookup

## [1.3.0](https://github.com/folio-org/ui-plugin-find-organization/tree/v1.3.0) (2019-07-19)
[Full Changelog](https://github.com/folio-org/ui-plugin-find-organization/compare/v1.2.0...v1.3.0)

* Remove tabIndex
* [ERM-230](https://issues.folio.org/browse/ERM-230) add buttonProps prop to OrganizationSearch, refs

## [1.2.0](https://github.com/folio-org/ui-plugin-find-organization/tree/v1.2.0) (2019-06-11)
[Full Changelog](https://github.com/folio-org/ui-plugin-find-organization/compare/v1.1.0...v1.2.0)
* [ERM-220](https://issues.folio.org/browse/ERM-220) pass id as prop to organization search;

## [1.1.0](https://github.com/folio-org/ui-plugin-find-organization/tree/v1.1.0) (2019-05-10)
[Full Changelog](https://github.com/folio-org/ui-plugin-find-organization/compare/v1.0.0...v1.1.0)

* [UIORGS-62](https://issues.folio.org/browse/UIORGS-62) Update Vendor plugin modal's second column title
* fetch new translations

## [1.0.0](https://github.com/folio-org/ui-plugin-find-organization/tree/v1.0.0) (2019-04-26)

* Migrate from ui-plugin-find-vendor.
