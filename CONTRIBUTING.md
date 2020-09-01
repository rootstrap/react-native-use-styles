## Got a question or problem?

Please, do not open issues for the general support questions as we want to keep GitHub issues for bug reports and feature requests. You've got much better chances of getting your question answered on [StackOverflow](http://stackoverflow.com/questions/tagged/react-native-use-styles) where maintainers are looking at questions tagged with `react-native-use-styles`.

StackOverflow is a much better place to ask questions since:

- there are hundreds of people willing to help on StackOverflow
- questions and answers stay available for public viewing so your question / answer might help someone else
- SO voting system assures that the best answers are prominently visible.

To save your and our time we will be systematically closing all the issues that are requests for general support and redirecting people to StackOverflow.

## You think you've found a bug?

Oh, we are ashamed and want to fix it asap! But before fixing a bug we need to reproduce and confirm it. In order to reproduce bugs we will systematically ask you to provide what we consider _minimal_ in order to try to reproduce it:

- version of React used
- version of React Native used
- version of this library that you are using
- 3rd-party libraries used, if any
- and most importantly - a use-case that fails
- If a code example/snippet is possible it is most welcomed

If there is any other information that you deem useful, please add it as well.

Having the information to reproduce the scenario, allows us to confirm the bug and then test that the solution actually fixes the problem.

We will be insisting on a minimal information to reproduce the scenario in order to save maintainers time and ultimately be able to fix more bugs. Interestingly.

Unfortunately we are not able to investigate / fix bugs without that minimal information, if the info is not provided and we don't hear back from you we are going to close your issue since don't have enough info to reproduce.

## You want to contribute some code?

We are always looking for the quality contributions and will be happy to accept your Pull Requests as long as those adhere to some basic rules:

- Please make sure that your contribution fits well in the project's context:
  - we are aiming to provide a small and simple library that makes animations easy to new comers or experienced developers that just need a light weight solution for implementing a very simple animation. New feature additions will have to be reviewed to see if the goal of the library is not lost in the process.
  - ideally no new dependencies should be added but a proposal can still be reviewed and again see if the goal of the library is still maintained in this case, the lightweight quality of the library could be compromised;
- Please assure that you are submitting quality code, specifically make sure that:
  <!-- * Add test requirements once tests are added to the library -->
  <!-- * your directive has accompanying tests and all the tests are passing; -->
  <!-- * Add circleCi requirement once the check is added -->
  <!-- * your PR doesn't break the build; check the CircleCi build status after opening a PR and push corrective commits if anything goes wrong -->

  ### How to run the demo app

  In order to contribute with some code you will need to test your changes within the demo app. At the moment the mechanism that we are using to test the lib inside the app is to import it locally. That means that:

  You need to install the dependencies on the library in production mode so you don't have problems with dual installations of react-native
  Each time you make a change, you need to do a force install of the library inside the demo folder.

  If you are comfortable using something like [Wix's wml](https://github.com/wix/wml), it could provide a better development experience for you. We wanted the main contributing option to not require any extra installations or knowledge. Symlinks have not worked and that is why we recommend Wml.
