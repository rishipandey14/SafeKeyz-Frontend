<a href="https://github.com/rishipandey14/SafeKeyz.git">SafeKeyz-Backend</a>

Structure and Reusable UI

- app/store: Redux store entry point (re-exports utils/appStore for now)
- components/ui: Reusable primitives (Button, Modal, Toast)
- hooks: Common hooks (useModal)
- utils: Constants and slices (to be moved into features/ in a future pass)

Usage

- Modal: Provide open, onClose, title. Place form/content as children; pass custom footer if needed.
- Button: Use variant (primary, secondary, danger, ghost, link) and size (sm, md, lg).
- Toast: Global toast connected to Redux store (unchanged UX).

Refactors

- AddItemModal and LogoutPopup now consume Modal + Button to ensure consistent styling and behaviors.
 
 