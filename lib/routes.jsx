Router.configure({
    layoutTemplate: 'external'
});

routeWithReact('/', <Home/>);

routeWithReact('/shop', <Shop/>);

routeWithReact('/meow', <Meow/>);

routeWithReact('/(.*)', <Lost/>);

function renderWithReact(component) {
    Meteor.startup(function(){
        if(Meteor.isClient) {
            _.defer(function(){
                React.render(
                    component,
                    document.getElementById("react-root")
                );
            });
        }
    });
}

function routeWithReact(route, component) {
    var options;

    if (component.reactComponent) {
        options = component;
        component = options.reactComponent;
    } else {
        options = {};
    }

    if (!options.layoutTemplate) {
        options.layoutTemplate = 'internal';
    }

    options.action = function() {
        this.render('React');
        var reactComponent = component;
        if(typeof component === 'function') {
            reactComponent = component.call(this);
        }
        renderWithReact(reactComponent);
    };

    Router.route(route, options);
}

/*
Router.onBeforeAction(function() {
    if(!Meteor.userId()) {
        this.redirect('/login');
    } else {
        this.next();
    }
}, {
    except: ['home', 'login', 'plaid-webhook']
});

Router.onBeforeAction(function() {
    if(Meteor.userId()) {
        this.redirect('/dashboard');
    } else {
        this.next();
    }
}, {
    only: ['home']
});

Router.onBeforeAction(function() {
    if(Meteor.userId()) {
        this.redirect('/');
    } else {
        this.next();
    }
}, {
    only: ['login']
});

Router.onBeforeAction(function() {
    if(this.ready()) {
        this.next();
    } else {
        renderWithReact(<div>Loading...</div>);
    }
});
*/



/*

Router.route('/logout', function() {
    Meteor.logout();
    this.redirect('/login');
});

routeWithReact('/dashboard', <Dashboard/>);

routeWithReact('/accounts', <AccountsPage/>);

routeWithReact('/accounts/new', {
    reactComponent: function() {
        if (this.params.query.type) {
            var institution = Institutions.findOne({ type: this.params.query.type });
            return <LinkAccountPage institution={institution} />
        } else {
            var institutions = Institutions.find().fetch();
            return <NewAccountPage institutions={institutions} />
        }
    }
});
routeWithReact('/accounts/:id', {
    reactComponent: function() {
        return <AccountPage accountId={this.params.id} />;
}
});

Router.route('/plaid/webhook', {
    name: 'plaid-webhook',
    where: 'server'
}).post(function() {
    var body = this.request.body;
    var code = body.code;
    console.info('plaid webhook received with code', code, 'accessToken', body.access_token);
    var account = FinancialAccounts.findOne({ accessToken: body.access_token });

    if (!account) {
        console.warn('Got webhook for access token', body.access_token, 'but no account exists.');
        // TODO: remove account on Plaid?
        this.response.end();
        return;
    }

    if (code === 0) {
        // Occurs once the initial transaction pull has finished.
        TransactionService.updateTransactions(account);
    } else if (code === 1) {
        // Occurs once the historical transaction pull has completed, shortly after the initial transaction pull.
    } else if (code === 2) {
        // Occurs at set intervals throughout the day as data is updated from the financial institutions.
        // TODO: Rate limit how often we call updateTransactions, to keep costs down.
        //       For example, we don't need to update non-active users.
        TransactionService.updateTransactions(account);
    } else if (code === 3) {
        // Occurs when transactions have been removed from our system.
        var transactionIds = body.removed_transactions;
        TransactionService.removeTransactions(account, transactionIds);
    } else {
        console.log('Plaid webhook error', code, message, resolve);
        // TODO: set status/message/resolve on account?
    }

    this.response.end();
});

Router.route('/', {
    name: 'home',
    template: 'Home'
});
*/