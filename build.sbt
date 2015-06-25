name := "MyMoney-Backend"

version := "1.0-SNAPSHOT"

libraryDependencies ++= Seq(
  javaJdbc,
  javaEbean,
  "org.springframework" % "spring-context" % "4.1.1.RELEASE",
  "mysql" % "mysql-connector-java" % "5.1.18"
)

play.Project.playJavaSettings
