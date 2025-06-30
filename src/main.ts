interface User {
  name: string;
  role?: string;
  title?: string;
}

interface GlobalState {
  state: {
    isLoading: boolean;
    isSaving: boolean;
  };
  getState: {
    getIsLoading: () => boolean;
    getIsSaving: () => boolean;
  };
  setState: {
    setIsLoading: (payload: boolean) => void;
    setIsSaving: (payload: boolean) => void;
  };
}

// Global state object managing loading and saving flags
const myGlobalState: GlobalState = {
  state: {
    isLoading: true,
    isSaving: true,
  },
  getState: {
    getIsLoading: () => myGlobalState.state.isLoading,
    getIsSaving: () => myGlobalState.state.isSaving,
  },
  setState: {
    setIsLoading: (payload: boolean) => {
      myGlobalState.state.isLoading = payload;
    },
    setIsSaving: (payload: boolean) => {
      myGlobalState.state.isSaving = payload;
    },
  },
};

/**
 * Class One acts as the main orchestrator or façade,
 * encapsulating state and user data,
 * and delegating specific responsibilities to helper classes Two and Three.
 */
class One {
  private country = 'Denmark';
  private user: User;
  private state: GlobalState;

  // Helper instances that encapsulate domain-specific logic
  private logicTwo: Two;
  private logicThree: Three;

  constructor(state: GlobalState, user: User) {
    this.state = state;
    this.user = user;

    // Initialize helper classes, passing this instance for interaction
    this.logicTwo = new Two(this);
    this.logicThree = new Three(this);

    // Apply initial logic from helpers during construction
    this.logicTwo.apply();
    this.logicThree.apply();
  }

  // Public getters/setters expose controlled access to private properties for helpers
  public getCountry() {
    return this.country;
  }
  public setCountry(newCountry: string) {
    this.country = newCountry;
  }
  public getUser() {
    return this.user;
  }
  public getState() {
    return this.state;
  }

  // Delegation methods: expose helper functionality to external callers

  /** 
   * Update the country value through helper Two.
   * @param newCountry The new country string
   */
  public updateCountry(newCountry: string) {
    this.logicTwo.setNewCountry(newCountry);
  }

  /**
   * Update the user's role through helper Three.
   * @param newRole The new role string
   */
  public updateUserRole(newRole: string) {
    this.logicThree.setUserRole(newRole);
  }

  // Display current state and user info
  public show() {
    console.log('User:', this.user);
    console.log('Country:', this.getCountry());
    console.log('Loading:', this.state.getState.getIsLoading());
    console.log('Saving:', this.state.getState.getIsSaving());
  }
}

/**
 * Helper class Two encapsulates logic related to country and user title management,
 * as well as updating the global saving state.
 */
class Two {
  constructor(private owner: One) {}

  /**
   * Apply initial logic such as setting a default user title and handling saving flag.
   */
  public apply() {
    this.setUserTitle();
    this.handleIsSaving();
    this.printCountry();
  }

  private setUserTitle() {
    this.owner.getUser().title = 'Product Manager';
  }

  private handleIsSaving() {
    this.owner.getState().setState.setIsSaving(false);
  }

  private printCountry() {
    console.log('Country in Two:', this.owner.getCountry());
  }

  /**
   * Update the country property on the owner (One) instance.
   * @param newCountry The new country string
   */
  public setNewCountry(newCountry: string) {
    this.owner.setCountry(newCountry);
    console.log('Updated country in Two:', this.owner.getCountry());
  }
}

/**
 * Helper class Three encapsulates logic related to the user's role management.
 */
class Three {
  constructor(private owner: One) {}

  /**
   * Apply initial logic such as printing the current user role.
   */
  public apply() {
    this.printUserRole();
  }

  /**
   * Update the user's role on the owner (One) instance.
   * @param newRole The new role string
   */
  public setUserRole(newRole: string) {
    this.owner.getUser().role = newRole;
    console.log('User role updated in Three:', this.owner.getUser().role);
  }

  private printUserRole() {
    console.log('User role in Three:', this.owner.getUser().role);
  }
}


const one = new One(myGlobalState, { name: 'john doe' });

// Shows initial state, title set by Two, role undefined
one.show(); 

// Calls Two’s method through One to update country
one.updateCountry('USA'); 

// Calls Three’s method through One to update user role
one.updateUserRole('Editor'); 

// Shows updated user role and country, and global state flags
one.show(); 
