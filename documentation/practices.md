# Practices

## Coding Practices

[Coding practices AWS](https://docs.aws.amazon.com/prescriptive-guidance/latest/best-practices-cdk-typescript-iac/typescript-best-practices.html#destructuring-props)

## Branch Management

When developing a feature, first make a new branch for it with
```bash
git branch -b new_feature
```

When you are done with the feature and want to push it to staging, create a pull reguest in github.
After you have merged the branches succesfully, delete the feature branch. Either from github or with:
```bash
git branch -d new_feature
```

Once all tests have been done and the staging branch has been tested to work in Openshift, it can be merged onto main.
